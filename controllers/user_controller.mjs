import User from "../models/user_models.mjs";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { setToken } from "../config/token_methods.mjs";
import sendMailer from "../config/mailer.mjs";
export default class UserController {
  static async create(req, res) {
    try {
      const { name, surname, patronymic, email, password } = req.body;
      const mail = await sendMailer({
        user: email,
        subject: "Для подтверждения почты перейдите по ссылке",
      });
      if(mail.success){
        const user = new User({
            name,
            surname,
            patronymic,
            email,
            password,
          });
          await user.save();
          return res.status(201).json({ msg: "Пользователь успешно создан" });  
      }else{
        console.log(mail.error);
      }
      
    } catch (error) {
      res.status(500).json({ msg: error });
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
    try {
      const { login, password } = req.body;
      const findUser = await User.findOne({ login: login, verifyed: true });
      if (!findUser || bcrypt.compareSync(password, findUser.password)) {
        res.status(400).json({ msg: "Неправильный логин или пароль" });
      }
      const tokenData = {
        _id: findUser._id,
        name: findUser.name,
        surname: findUser.surname,
        login: findUser.login,
      };
      const token = await setToken(tokenData);
      res.status(200).json({ token: token });
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  }
  static async read(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 1;
      const skip = (page - 1) * limit;
      const totalCount = await User.countDocuments();
      const users = await User.aggregate([
        {
          $project: {
            _id: 1,
            name: 1,
            surname: 1,
            patronymic: 1,
            login: 1,
            role: 1,
          },
        },
        { $skip: skip },
        { $limit: limit },
      ]);
      if (users.length === 0) {
        return res.status(404).json({ msg: "Пользователи не найдены" });
      }
      res
        .status(201)
        .json({
          users: users,
          page: page,
          pages: Math.ceil(totalCount / limit),
        });
    } catch (err) {
      res.status(500).json({ msg: err });
    }
  }
  static async readOne(req, res) {
    try {
      const id = req.params.id;
      const user = await User.findById(
        id,
        "name surname patronymic login role"
      ).lean();
      if (!user) {
        res.status(400).json({ msg: "Не найдено" });
      }
      res.status(201).json({ user });
    } catch (err) {
      res.status(500).json({ msg: err });
    }
  }
  static async update(req, res) {
    try {
      const id = req.params.id;
      const { name, surname, patronymic } = req.body;
      const user = await User.findByIdAndUpdate(
        id,
        { name, surname, patronymic },
        { new: true }
      );
      return res.status(200).json({ msg: "Данные обновлены" });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
  static async delete(req, res) {
    try {
      const id = req.params.id;
      const user = await User.findByIdAndDelete(id);
      res.json({ msg: "Пользователь удалён" });
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  }
}
