const fs = require('fs');
const csv = require('csv-parser');
const db = require('../models');

// create main model
const UserModel = db.user;
const Op = db.Op;
const Sequelize = db.Sequelize;

const converter = async (req, res) => {
    try {
        const inputFile = process.env.CSV_FILE_PATH;

        if(!inputFile){
            res.status(400).send({"message":"File not found"});
            return;
        }

        let listJson = [];
        let inputObj = [];
        let mandatoryFields = ["name", "age", "address"];

        fs.createReadStream(inputFile)
        .pipe(csv())
        .on('data', async (row) => {
            const json = {};
            Object.keys(row).forEach((key) => {
                const keys = key.split('.');
                let obj = json;
                for (let i = 0; i < keys.length - 1; i++) {
                    if (!obj[keys[i]]) {
                        obj[keys[i]] = {};
                    }
                    obj = obj[keys[i]];
                }
                obj[keys[keys.length - 1]] = row[key];
            });
            listJson.push(json);

            // Mandatory fields
            let info = {
                "name": json["name"].firstName + json["name"].lastName,
                "age": json.age,
                "address": json.hasOwnProperty("address") ? json.address : {}
            }

            // Additional fields
            let additional_info = {};

            Object.keys(json).forEach((key) => {
                if(!mandatoryFields.includes(key)){
                    additional_info[key] = json[key];
                }
            });

            info["additional_info"] = additional_info;

            // Create Record
            // await UserModel.create(info);
            inputObj.push(info);
        })
        .on('end', async() => {
            // Create bulk records
            // await UserModel.bulkCreate(inputObj, {returning: true});
            await UserModel.bulkCreate(inputObj);

            // Age Distribution
            let report = {
                "headers": ["Age-Group", "%Distribution"]
            };

            let reportDetails = await UserModel.findAll({
                where: {
                  age: {
                    [Op.not]: null
                  }
                },
                attributes: [
                  [Sequelize.literal('COUNT (CASE WHEN age < 20 THEN age END)'), '< 20'],
                  [Sequelize.literal('COUNT (CASE WHEN age >= 20 AND age <= 40 THEN age END)'), '20 to 40'],
                  [Sequelize.literal('COUNT (CASE WHEN age >= 40 AND age <= 60 THEN age END)'), '40 to 60'],
                  [Sequelize.literal('COUNT (CASE WHEN age > 60 THEN age END)'), '> 60'],
                  [Sequelize.fn('count', Sequelize.col('id')), 'count']
                ]
            });

            report["details"] = reportDetails;

            // console.log(JSON.stringify(listJson, null, 2));
            res.status(200).send({"result": listJson, "report": report});
        });
  
    } catch(err) {
        res.status(501).send({"error": err});
    }
};

module.exports = {
    converter
}