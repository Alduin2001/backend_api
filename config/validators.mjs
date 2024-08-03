const validators = [
    {
        pattern:/^[А-Яа-я]+$/,
        message:'должно быть кириллицей'
    },
    {
        pattern:/^\S+@\S+\.\S+$/,
        message:'Поле не является почтой'
    },
    {
        pattern:/^[0-9]{11}/,
        message:'должны содержать только цифры'
    }
];

export default validators;