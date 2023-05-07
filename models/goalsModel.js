const nedb = require('nedb');
let idCounter = 0;

class Fitness {
    constructor() {
        this.db = new nedb({ filename: "./goals.db", autoload: true });
        console.log('DB connected to ' + './goals.db');

        //this.idCounter = new idCounter;
        //console.log(this.idCounter);
    }

    //a function to seed the database
    init() {
        /*
        this.db.insert({
            goal: 'Test Fitness Goal',
            goal_Type: 'Test Goal Type',
            entry_Type: 'Fitness Goal',
            goal_Created_Date: new Date().toISOString().split('T')[0],
            set_Achievement_Date: '08/08/2023',
            goal_Achieved: 'No',
            actual_Achievement_Date: '08/08/2023',
            goal_Reps: "1",

        });
        //for later debugging
        console.log('db entry test fitness goal inserted');
        //console.log(this.idCounter);

        this.db.insert({
            goal: 'Test Nutrition Goal',
            goal_Type: 'Test Nutrition Type',
            entry_Type: 'Nutrition Goal',
            goal_Created_Date: new Date().toISOString().split('T')[0],
            set_Achievement_Date: '08/08/2023',
            goal_Achieved: 'No',
            actual_Achievement_Date: '08/08/2023',
            goal_Reps: "0",

        });
        //for later debugging
        console.log('db entry test nutrition goal inserted');
        //console.log(this.idCounter);

        this.db.insert({
            goal: 'Test Healthy Lifestyle Goal',
            goal_Type: 'Test Healthy Lifestyle Type',
            entry_Type: 'Healthy Lifestyle Goal',
            goal_Created_Date: new Date().toISOString().split('T')[0],
            set_Achievement_Date: '08/08/2023',
            goal_Achieved: 'No',
            actual_Achievement_Date: '08/08/2023',
            goal_Reps: "0",

        });
        //for later debugging
        console.log('db entry test healthy lifestyle goal inserted');
        //console.log(this.idCounter);
        */
    }

    //a function to return all  from the database
    getAllGoal() {
        //return a Promise object, which can be resolved or rejected
        return new Promise((resolve, reject) => {
            //use the find() function of the database to get the data,
            //error first callback function, err for error,  for data
            this.db.find({}, function (err, entries) {
                //if error occurs reject Promise
                if (err) {
                    reject(err);
                    //if no error resolve the promise & return the data
                } else {
                    resolve(entries);
                    //to see what the returned data looks like
                    console.log('function getAllGoal() returns: ', entries);
                }
            })
        })
    }

    //a function to return all uncompleted fitness goal entries from the database
    getAllUncompletedFitnessGoal() {
        return new Promise((resolve, reject) => {
            this.db.find({ entry_Type: 'Fitness Goal', goal_Achieved: "No" }, function (err, entries) {
                if (err) {
                    reject(err);
                } else {
                    resolve(entries);
                    console.log('getAllUncompletedFitnessGoal returns: ', entries);
                }
            })
        })
    }

    //a function to return all uncompleted fitness goal entries from the database
    getAllCompletedFitnessGoal() {
        return new Promise((resolve, reject) => {
            this.db.find({ entry_Type: 'Fitness Goal', goal_Achieved: "Yes" }, function (err, entries) {
                if (err) {
                    reject(err);
                } else {
                    resolve(entries);
                    console.log('getAllCompletedFitnessGoal returns: ', entries);
                }
            })
        })
    }

    //a function to return all Uncompleted Nutrition goal  from the database
    getAllUncompletedNutritionGoal() {
        return new Promise((resolve, reject) => {
            this.db.find({ entry_Type: 'Nutrition Goal', goal_Achieved: "No" }, function (err, entries) {
                if (err) {
                    reject(err);
                } else {
                    resolve(entries);
                    console.log('getAllUncompletedNutritionGoal returns: ', entries);
                }
            })
        })
    }

    //a function to return all uncompleted Nutrition goal entries from the database
    getAllCompletedNutritionGoal() {
        return new Promise((resolve, reject) => {
            this.db.find({ entry_Type: 'Nutrition Goal', goal_Achieved: "Yes" }, function (err, entries) {
                if (err) {
                    reject(err);
                } else {
                    resolve(entries);
                    console.log('getAllCompletedNutritionGoal returns: ', entries);
                }
            })
        })
    }



    //a function to return all Uncompleted Healthy Lifestyle goal from the database
    getAllUncompletedHealthyLifestyleGoal() {
        return new Promise((resolve, reject) => {
            this.db.find({ entry_Type: 'Healthy Lifestyle Goal', goal_Achieved: "No" }, function (err, entries) {
                if (err) {
                    reject(err);
                } else {
                    resolve(entries);
                    console.log('getAllUncompletedHealthyLifestyleGoal returns: ', entries);
                }
            })
        })
    }

    //a function to return all Completed Healthy Lifestyle goal entries from the database
    getAllCompletedHealthyLifestyleGoal() {
        return new Promise((resolve, reject) => {
            this.db.find({ entry_Type: 'Healthy Lifestyle Goal', goal_Achieved: "Yes" }, function (err, entries) {
                if (err) {
                    reject(err);
                } else {
                    resolve(entries);
                    console.log('getAllCompletedHealthyLifestyleGoal returns: ', entries);
                }
            })
        })
    }



    addGoal(goal, goal_Type, entry_Type, set_Achievement_Date, goal_Reps) {
        var newGoal = {
            goal: goal,
            goal_Type: goal_Type,
            entry_Type: entry_Type,
            goal_Created_Date: new Date().toISOString().split('T')[0],
            set_Achievement_Date: set_Achievement_Date,
            goal_Achieved: 'No',
            actual_Achievement_Date: ' ',
            goal_Reps: goal_Reps,
        }
        console.log('Goal entry created', newGoal);
        this.db.insert(newGoal, function (err, doc) {
            if (err) {
                console.log('Error inserting document', goal);
            } else {
                console.log('document inserted into the database', doc);
            }
        })
    }

    updateGoal(goalId, goal, goal_Type, set_Achievement_Date, goal_Reps) {
        this.db.update(
            { _id: goalId },
            {
                $set: {
                    goal: goal,
                    goal_Type: goal_Type,
                    set_Achievement_Date: set_Achievement_Date,
                    goal_Reps: goal_Reps
                }
            },

            {},
            function (err, docs) {
                if (err) {
                    console.log("error updating goal", err);
                } else {
                    console.log(docs, "goal updated");
                }
            }
        )
    }


    deleteGoal(goalId) {
        var newGoal = {
            goalId: goalId
        }
        console.log('Goal entry deleted', newGoal);
        this.db.remove({ _id: goalId }, {}, function (err, docsRem) {
            if (err) {
                console.log("error deleting goal");
            } else {
                console.log(docsRem, "Goal removed from database");
            }
        })
    }

    completeGoal(goalId) {
        this.db.update(
            { _id: goalId },
            {
                $set: {
                    goal_Achieved: "Yes",
                    actual_Achievement_Date: new Date().toISOString().split('T')[0]
                }
            },

            {},
            function (err, docs) {
                if (err) {
                    console.log("error completing goal", err);
                } else {
                    console.log(docs, "goal achieved");
                }
            }
        )
    }

    getGoalsById(goalId) {
        return new Promise((resolve, reject) => {
            this.db.find({ '_id': goalId }, function (err, entries) {
                if (err) {
                    reject(err);
                } else {
                    resolve(entries);
                    console.log('getEntriesByUser returns: ', entries);
                }
            })
        })
    }

}
module.exports = Fitness;