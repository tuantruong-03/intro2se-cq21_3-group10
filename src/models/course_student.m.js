const db = require('../database/db');
const tbName = 'course_student';
module.exports = class Course_Student {
    constructor({ course_id, user_id,FinalScore }) {
        this.course_id=course_id;
        this.user_id=user_id;
        this.finalscore=FinalScore;
    }

    static async getAll() {
        try {
            const data = await db.getAll(tbName);
            return data;
        }
        catch (error) {
            throw error;
        }
    }

    static async getCondition(tbColum, value) {
        try {
            const data = await db.getCondition(tbName, tbColum, value);
            return data;
        }
        catch (error) {
            throw error;
        }

    }
    
    static async insert(course_student) {
        try {
            const data=await db.insert(tbName, course_student,'course_id');
            return data;
        }
        catch (error) {
            throw error;
        }
    }
};