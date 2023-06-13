const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")
const axios = require("axios")
const { isValid, isValidRequestBody, isValidString , isValidEmail , isValidMobile } = require("../utils/validation")

const college = async function (req, res) {
  try {
    const data = req.body;
    
    if (!isValidRequestBody(data)) {
      return res.status(400).send({ status: false, message: "Please enter College Details" });
    }

    const { name, fullName, logoLink } = data;
    if(!name || !fullName || !logoLink){
      return res.status(400).send({ status: false, message: "Please enter all field" });
    }
    // if (!isValidString(name) || !isValidString(fullName)) {
    //   return res.status(400).send({ status: false, message: "Please enter valid college name and fullName" });
    // }

    if (!isValid(logoLink)) {
      return res.status(400).send({ status: false, message: "Please provide a valid logoLink" });
    }

    const isName = await collegeModel.findOne({ name: name });
    if (isName) {
      return res.status(400).send({ status: false, message: "College already registered" });
    }

    try {
      await axios.head(logoLink);
    } catch (error) {
      return res.status(400).send({ status: false, message: "Please provide a valid and accessible logoLink" });
    }

    const collegeData = await collegeModel.create({
      name,
      fullName,
      logoLink
    });
    const response = {
      name : collegeData.name,
      fullName : collegeData.fullName,
      logoLink : collegeData.logoLink,
      isDeleted :collegeData.isDeleted
    }

    return res.status(201).send({ status: true, data: response });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ status: false, message: "Internal Server Error" });
  }
};


const interns = async function (req, res){
  try{
    const data = req.body
    if(!isValidRequestBody(data)){
      return res.status(400).send({status:false, message:"Please enter Intern Details"})
    }
    const { name, email, mobile, collegeName } = data;

    if( !name|| !email || !mobile || !collegeName){
      return res.status(400).send({status:false, message:"Please enter all field "})
    }
    if(!isValid(data)){
      return res.status(400).send({status:false, message:"Please enter Valid Details"})
    }
    if(!isValidString(name)){
      return res.status(400).send({status:false, message:"Please enter Valid name"})
    }
    if(!isValidEmail(email)){
      return res.status(400).send({status:false, message:"Please enter Valid email"})
    }
    if(!isValidMobile(mobile)){
      return res.status(400).send({status:false, message:"Please enter Valid Mobile number"})
    }

    const emailUsed = await internModel.findOne({ email: email });
    if (emailUsed) {
      return res.status(400).send({ status: false, message: "Email is already registered" });
    }

    const isMobile = await internModel.findOne({ mobile: mobile });
    if (isMobile) {
      return res.status(400).send({ status: false, message: "Mobile number already registered" });
    }

    const collegeCheck = await collegeModel.findOne({ name: collegeName });
    if (!collegeCheck) {
      return res.status(400).send({ status: false, message: "collegeName is not registered" });
    }

    //validation ends

    let collegeId = collegeCheck._id;
    
    const result = await internModel.create({ name, email, mobile, collegeId });
    const response = {
      isDeleted : result.isDeleted,
      name : result.name,
      email : result.email,
      mobile : result.mobile,
      collegeId : result.collegeId
    }
    return res.status(201).send({ status: true, data: response });

  }catch(error){
    return res.status(500).send({ status: false, message: error.message });
  }
}

let collegeDetails = async (req, res) => {
  try{
    let query = req.query.collegeName;
    if(!isValid(query)){
      return res.status(400).send({status: false,message:"Please provide Valid College name details"});
    }
    if(!isValidString(query)){
      return res.status(400).send({status: false,message:"Please provide Valid College name details"});
    }

    let getCollege = await collegeModel.findOne({ name: query });
    if (!getCollege) {
      return res.status(400).send({ status: false, message: "No college exists with that name" });
    }

    let id = getCollege._id;

    let interns = await internModel.find({ collegeId: id, isDeleted: false }).select('_id name email mobile')    

    let data = {
      name: getCollege.name,
      fullName: getCollege.fullName,
      logoLink: getCollege.logoLink,
      interns: interns, //array in intern
    };
    return res.status(201).send({ status: true, data: data });
  }catch(error){
    return res.status(500).send({ status: false, message: err.message });
  }
}

module.exports = { college, interns, collegeDetails };
