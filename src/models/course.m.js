const db = require('../database/db');
const tbName = 'course';
module.exports = class Course {

    constructor({ course_name, numberOfStudent,numberOfTeacher,schedule,MaxNumberOfStudent }) {
        this.course_name=course_name;
        this.numberofstudent=numberOfStudent;
        this.numberofteacher=numberOfTeacher;
        this.schedule=schedule;
        this.maxnumberofstudent=MaxNumberOfStudent;
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
    static async insert(course) {
        try {
            const data=await db.insert(tbName, course,'course_name');
            return data;
        }
        catch (error) {
            throw error;
        }
    }
};