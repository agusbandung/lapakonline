const Map = require('../models/maps')
const config = require('../config')


module.exports = {
  search:function(req,res){
    let title = req.body.title.toLowerCase()
    Map.find({$where:`/${title}.*/.test(this.title.toLowerCase())`},function(err,data){
      console.log(data);
      if(err)res.json({error:err})
      else res.json(data)
    })
  },
  read:function(req,res){
    Map.find(function(err,map){
      if(err)res.json({success:false,message:"data not found"})
      else res.json(map)
    })
  },
  edit:function(req,res){
    Map.findById(req.params.id,function(err,map) {
      if(err)res.json({'Error':err})
      else{
        map.title = req.body.title
        map.lat = Number(req.body.latitude)
        map.lng = Number(req.body.longitude)
        map.save(function(err){
          if(err)res.json({success:false,message:"data have been failed to update"})
          else res.json({success:true,message:"data have been updated",data:map})
        })
      }
    })
  },
  add:function(req,res){
    let title = req.body.title
    let lat = Number(req.body.latitude)
    let lng = Number(req.body.longitude)
    let newMap = new Map({
      title:title,
      lat:lat,
      lng:lng
    })
    newMap.save(function(err,map){
      if(err)res.json({success:false,message:"data have failed to be added"})
      else res.json({success:true,message:"data have been added",data:map})
    })
  },
  destroy:function(req,res){
    Map.findById(req.params.id,function(err,data){
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
    Map.findById(req.params.id,function(err,data){
      console.log(data);
      if(err)res.json({success:false,message:"data have not been found"})
      else res.json({success:true,message:"data found",data:data})
    })
  }
}
