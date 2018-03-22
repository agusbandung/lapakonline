const Datadate = require('../models/datadate')
const datadates = require('../seeder/data.json')
const config = require('../config')


module.exports = {
  seedData:function(req,res){
    for(datadate of datadates){
      let newDatadate = new Datadate(datadate)
      newDatadate.save()
    }
    res.send('Database seeded')
  },
  search:function(req,res){
    let letter = req.body.letter
    let frequency = Number(req.body.frequency)

    if(letter && frequency){
      Datadate.find({$and:[{$where:`/${letter}.*/.test(this.letter)`},{$where:`/${frequency}.*/.test(this.frequency)`}]},function(err,data){
        if(err)res.json({error:err})
        else res.json(data)
      })
    }else if(letter){
      Datadate.find({$where:`/${letter}.*/.test(this.letter)`},function(err,data){
        if(err)res.json({error:err})
        else res.json(data)
      })
    }else if(frequency){
      Datadate.find({$where:`/${frequency}.*/.test(this.frequency)`},function(err,data){
        if(err)res.json({error:err})
        else res.json(data)
      })
    }
  },
  read:function(req,res){
    Datadate.find((function(err,datas){
      if(err)res.json({success:false,message:"data not found"})
      else res.json(datas)
    }))
  },
  edit:function(req,res){
    Datadate.findById(req.params.id,function(err,data){
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
    let letter = req.body.letter
    let frequency = Number(req.body.frequency)
    let newData = new Datadate({
      letter:letter,
      frequency:frequency
    })
    newData.save(function(err,data) {
      if(err)res.json({success:false,message:"data have failed to be added"})
      else res.json({success:true,message:"data have been added",data:data})
    })
  },
  destroy:function(req,res){
    Datadate.findById(req.params.id,function(err,data){
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
    Datadate.findById(req.params.id,function(err,data){
      if(err)res.json({success:false,message:"data have not been found"})
      else res.json({success:true,message:"data found",data:data})
    })
  }
}
