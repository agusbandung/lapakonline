const Data = require('../models/data')
const datas = require('../seeder/data.json')
const config = require('../config')

module.exports = {
  search:function(req,res){
    let letter = req.body.letter
    let frequency = Number(req.body.frequency)
    if(letter && frequency){
      Data.find({$and:[{letter:new RegExp(letter,'i')},{$where:`/${frequency}.*/.test(this.frequency)`}]},function(err,data){
        console.log(data);
        if(err)res.json({error:err})
        else res.json(data)
      })
    }else if(letter){
      Data.find({letter:new RegExp(letter,'i')},function(err,data){
        if(err)res.json({error:err})
        else res.json(data)
      })
    }else if(frequency){
      Data.find({$where:`/${frequency}.*/.test(this.frequency)`},function(err,data){
        if(err)res.json({error:err})
        else res.json(data)
      })
    }
  },
  read:function(req,res){
    Data.find((function(err,datas){
      if(err)res.json({success:false,message:"data not found"})
      else res.json(datas)
    }))
  },
  edit:function(req,res){
    Data.findById(req.params.id,function(err,data){
      if(err)res.json({'Error':err})
      else{
        data.letter = req.body.letter
        data.frequency = Number(req.body.frequency)
        data.save(function(err){
          if(err)res.json({success:false,message:"data have been failed to update"})
          else res.json({success:true,message:"data have been updated",data:data})
        })
      }
    })
  },
  add:function(req,res){
    let letter = req.body.letter.toUpperCase()
    let frequency = Number(req.body.frequency)
    let newData = new Data({
      letter:letter,
      frequency:frequency
    })
    newData.save(function(err,data) {
      if(err)res.json({success:false,message:"data have failed to be added"})
      else res.json({success:true,message:"data have been added",data:data})
    })
  },
  destroy:function(req,res){
    Data.findById(req.params.id,function(err,data){
      if(err)res.json({'Error':err})
      else{
        data.remove(function(err){
          if(err)res.json({success:false,message:"data have not been deleted"})
          else{
            res.json({success:true,message:"data have been deleted",data:data})
          }
        })
      }
    })
  },
  findbyid:function(req,res){
    Data.findById(req.params.id,function(err,data){
      console.log(data);
      if(err)res.json({success:false,message:"data have not been found"})
      else res.json({success:true,message:"data found",data:data})
    })
  }
}
