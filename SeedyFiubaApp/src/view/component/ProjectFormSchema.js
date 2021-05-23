import * as yup from "yup";


const projectSchema = yup.object({
    name: yup.string()
        .required(),
    description: yup.string()
        .required(),
    goal: yup.string()
        .required()
        .test('is-valid-num', 'Must be at least AR$ 100', (val) => {
            return parseInt(val) >= 100;
        }),
    type: yup.string()
        .required(),
    endDate: yup.string()
        .required(),
});
export default projectSchema