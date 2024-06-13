const {account, Account} = require("../model/account")
const bcrypt = require("bcrypt")

//Password encryption
async function hashPassword(password){
    const saltRounds = 10;
    const hashedPasword = await bcrypt.hash(password, saltRounds);
    return hashedPasword;
}

//Check if user entered the correct password when logging in
async function checkPassword(password, hashedPasword){
    const result = await bcrypt.compare(password, hashedPasword);
    return result;;
}

async function createAcc(req, res){
    const{
        firstname,
        lastname,
        email,
        phonum,
        pawd
    } = req.body;
    const hashed = await hashPassword(pawd);
    const account = new Account({
        firstname: firstname,
        lastname: lastname,
        email: email,
        phonum: phonum,
        pawd: pawd,
    })
    try{
        const validate = await Account.findOne({email: email});
        if(validate){
            return res.status(400).json({error: "This email has been used."});
        }

        await account.save();
        res.status(200).json(account);
    }
    catch(ERROR){
        res.status(500).json({error: ERROR});
    }
}

async function loginAcc(req, res){
    const{email, pawd} = req.body;
    if(!email || !pawd){
        res.status(400).json({message: "Missing field"});
        return;
    }

    try{
        const Account = await account.findOne({email: email});
        if(!Account){
            res.status(401).json({message: "User not found"});
            return;
        }
        const pwMatch = await hashPassword(pawd, Account.pawd);
        if(!pwMatch){
            res.status(402).json({message: "Incorrect password"});
        }

        res.status(200).json(Account);
    } catch(ERROR){
        console.error(ERROR.message);
        res.status(500).json(ERROR);
        return;
    }
}

async function updtAcc(req, res){
    try{
        const {
            firstname,
            lastname,
            email,
            phonum,
            pawd
        } = req.body;
        const hashed = await hashPassword(pawd);

        if(!pawd){
            const update = await account.findOneAndUpdate({
                firstname: firstname,
                lastname: lastname,
                email: email,
                phonum: phonum,
                pawd: pawd
            }, {new: true});
            res.status(201).json(update);
        }
        else{
            const update = await account.findOneAndUpdate({
                firstname: firstname,
                lastname: lastname,
                email: email,
                phonum: phonum,
                pawd: hashed
            }, {new: true});
            res.status(201).json(update);
        }
    }
    catch(ERROR){
        console.log(ERROR);
        res.status(500).json(ERROR);
    }
}

async function delAcc(req, res){
    const{email} = req.body; //Delete account only based on eMail
    try{
        const delte = await account.findOneAndDelete({email: email});
        res.status(200).json(delte);
    }
    catch(ERROR){
        res.status(500).json({error: ERROR})
    }
}

module.exports = {
    createAcc,
    loginAcc,
    updtAcc,
    delAcc
}