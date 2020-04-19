class Db {
    /**
     * Constructors an object for accessing kittens in the database
     * @param mongoose the mongoose object used to create schema objects for the database
     */
    constructor(mongoose) {
        // This is the schema we need to store questions in MongoDB
        const questionSchema = new mongoose.Schema({
            title: String,
            answers: [{
                text: String,
                vote: Number
            }]
        });


        // This model is used in the methods of this class to access questions
        this.Question = mongoose.model('Question', questionSchema);
    }

    async getQuestions() {
        try {
            return await this.Question.find({})
        } catch (error) {
            console.error("getQuestions:", error.message);
            return {};
        }
    }

    async createQuestion(newQuestion) {
        try {
            const question = new this.Question(newQuestion);
            return await question.save();
        } catch (error) {
            console.error(error);
            return {};
        }
    }

    async addAnswer(qId, answer) {
        try {
            const question = await this.Question.findById(qId);
            question.answers.push(answer);
            return await question.save();
        } catch (error) {
            console.error(error);
            return {};
        }
    }

    async updateVote(qId, aId, vote) {
        try {
            const question = await this.Question.findById(qId);
            const answer = await question.answers.find(a => a.id === aId);
            answer.vote = vote;
            return await question.save();
        } catch (error) {
            console.error(error);
            return {};
        }
    }
}

module.exports = mongoose => new Db(mongoose);