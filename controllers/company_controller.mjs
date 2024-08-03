import Company from "../models/company_model.mjs";
import generatePhrase from "../config/seed_phrase.mjs";
import { setToken } from "../config/token_methods.mjs";
import sendMailer from "../config/mailer.mjs";
import User from "../models/user_models.mjs";
export default class CompanyController {
  static async create(req, res) {
    try {
      const { INN, OGRN, email, name, phone, dateRegister } = req.body;
      const seed = generatePhrase(5);
      const company = new Company({
        INN: INN,
        OGRN: OGRN,
        name: name,
        email: email,
        phone: phone,
        seed: seed,
        dateRegister: dateRegister,
      });
      await company.save();
      const mail = await sendMailer({
        user: email,
        subject: "Для подтверждения",
        verificationToken: company.verificationToken,
      });
      if (mail.success) {
        return res.status(201).json({ seed });
      } else {
        return res.status(500).json({ msg: "Ошибка при отправке письма" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }
  static async verifycationFromEmail(req, res) {
    try {
      const verificationToken = req.params.token;
      let user = await User.findOne({ verificationToken });
      if (!user) {
        return res.status(404).json({ msg: "Пользователя не существует" });
      }
      user.verifyed = true;
      await user.save();
      res.status(200).json({ msg: "Ваша почта подтверждена" });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
  static async login(req, res) {
    const { email, seed } = req.body;
    const company = await Company.aggregate([
      {
        $match: { email: email, seed: seed, isVerified: true },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          INN: 1,
          OGRN: 1,
          email: 1,
          phone: 1,
        },
      },
    ]);
    if (company.length === 0) {
      return res.status(404).json({ msg: "Неверно введены данные" });
    } else {
      const payload = {
        _id: company[0]._id,
        name: company[0].name,
        INN: company[0].INN,
        OGRN: company[0].OGRN,
        email: company[0].email,
        phone: company[0].phone,
      };
      const token = await setToken(payload);
      console.log(token);
      return res.status(200).json({ token });
    }
  }
  static async read(req, res) {
    try {
      // Поиск по названию
      const companies = await Company.aggregate([
        {
          $project: {
            _id: 1,
            INN: 1,
            OGRN: 1,
            email: 1,
            phone: 1,
          },
        },
      ]);
      return res.status(200).json({ companies });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
  static async readOne(req, res) {
    try {
      const id = req.params.id;
      const company = await Company.findById(id);
      if (company) {
        return res.status(200).json({ company });
      } else {
        return res.status(404).json({ msg: "Не найдено" });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  }
  // static async update(req,res){
  //     try {
  //         const id = req.params.id;
  //         const company = await Company.findByIdAndUpdate(id,req.body,{new:true});
  //         res.status(200).json({msg:'Успешно обновлён'});
  //     } catch (error) {
  //         res.status(500).json({error});
  //     }
  // }
  static async delete(req, res) {
    try {
      const id = req.params.id;
      const company = await Company.findByIdAndDelete(id);
      res.json({ msg: "Успешно удалён" });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}
