const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")
const axios = require("axios")
const { isValid, isValidrequestBody, isValidString , isValidEmail , isValidMobile } = require("../utils/validation")

const college = async function (req, res) {
  try{
    const data = req.body
    if(!isValidrequestBody(data)){
      res.status(400).send({status:false, message:"Please enter College Details"})
    }

    const { name , fullName, logoLink } = data
    if(!isValidString(name && fullName)){
      res.status(400).send({status:false, message:"Please enter valid college name and fullName"})
    }
    if(!isValid(name) && !isValid(fullName)){
      res.status(400).send({status:false , message:"Please provide Valid name and fullName"})
    }
    const isName = await collegeModel.findOne({ name: data.name });

    if(isName){
      res.status(400).send({status:false , message:"College Already Registered"})
    }
    if(!isValid(logoLink)){
      res.status(400).send({status:false , message:"Please provide Valid logoLink"})
    }
    const logoLinkCheck = await axios.head(logoLink);
    if (logoLinkCheck.status !== 200) {
      res.status(400).send({ status: false, message: "Please provide a valid and accessible logoLink" });
    }

    const collegeData = await collegeModel.create({
      name,
      fullName,
      logoLink
    })
    res.status(201).send({ status: true, data: collegeData });
  }catch(error){
    console.error(error);
    return res.status(500).send({  status: false, message: "Internal Server Error" });
  }
}

const interns = async function (req, res){
  try{
    const data = req.body
    if(!isValidrequestBody(data)){
      res.status(400).send({status:false, message:"Please enter Intern Details"})
    }
    const { name, email, mobile, collegeName } = data;
    if(!isValid(name && email && mobile && collegeName)){
      res.status(400).send({status:false, message:"Please enter Valid Details"})
    }
    if(!isValidString(name)){
      res.status(400).send({status:false, message:"Please enter Valid name"})
    }
    if(!isValidEmail(email)){
      res.status(400).send({status:false, message:"Please enter Valid email"})
    }
    if(!isValidMobile(mobile)){
      res.status(400).send({status:false, message:"Please enter Valid Mobile number"})
    }

    const emailUsed = await internModel.findOne({ email: email });
    if (emailUsed) {
      res.status(400).send({ status: false, message: "Email is already registered" });
    }

    const isMobile = await internModel.findOne({ mobile: mobile });
    if (isMobile) {
      res.status(400).send({ status: false, message: "Mobile number already registered" });
    }

    const collegeCheck = await collegeModel.findOne({ name: collegeName });
    if (!collegeCheck) {
     res.status(400).send({ status: false, message: "collegeName is not registered" });
    }

    //validation ends

    let collegeId = collegeCheck._id;
    const result = await internModel.create({ name, email, mobile, collegeId });
    res.status(201).send({ status: true, data: { result } });

  }catch(error){
    res.status(500).send({ status: false, message: err.message });
  }
}

let collegeDetails = async (req, res) => {
  try{
    let query = req.query.collegeName;
    if(!isValid(query)){
      res.status(400).send({status: false,message:"Please provide Valid Collegname details"});
    }
    if(!isValidString(query)){
      res.status(400).send({status: false,message:"Please provide Valid Collegname details"});
    }

    let getCollege = await collegeModel.findOne({ name: query });
    if (!getCollege) {
      res.status(400).send({ status: false, message: "No college exists with that name" });
    }

    let id = getCollege._id;

    let interns = await internModel.find({ collegeId: id, isDeleted: false })
      .populate('collegeId', 'name fullName logoLink')
      .select({ _id: 1, name: 1, email: 1, mobile: 1 });
    

    let data = {
      name: getCollege.name,
      fullName: getCollege.fullName,
      logoLink: getCollege.logoLink,
      interns: interns, //array in intern
    };
    return res.status(200).send({ status: true, data: data });
  }catch(error){
    res.status(500).send({ status: false, message: err.message });
  }
}

module.exports = { college, interns, collegeDetails };