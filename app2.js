class a{
  constructor(a){
    this.a =1
  }

}

class b extends a{
  constructor(){
    super()
    this.a=2
    this.b=3
  }

  }



class c extends a{
  constructor(){
    super()
    this.a=2
    this.b=3
    this.c=4
  }

}

class d  extends a{

}


  bb=new b()
aa=new a()
cc=new c()
dd=new a()
ee = new d()
console.log(bb)
console.log(aa)
console.log(cc)
console.log(dd)
console.log(ee)

