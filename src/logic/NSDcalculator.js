

const NSDcalculator = (category, amount=0) => {
  console.log(category, amount)
  if(category==1){
      return amount*40
  }
  else if(category==2){
      return 0
  }
  else if(category==3){
    return amount*25
  }
  else if(category==4){
    return amount*60
  }
  else if(category==5){
    return amount*60
  }
  else if(category==6){
    return amount*60
  }
  else if(category==7){
    return 0
  }
  else if(category==8){
    return amount*40
  }
  else if(category==9){
    return 25
  }
}
export default  NSDcalculator