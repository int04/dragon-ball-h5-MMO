function checkCache(img) {
    let check = cache.find((item) => {
      return item == img;
    });
    return check;
  }
  
  let PC = false;
  
  
  
  
  let loader = new PIXI.Loader();
  
  let assets = [];
  /**
   * @param {string} name
   * Dạng { name: 'name', url: 'url' }
   */
  
  let loadAssetMap = function(name)
  {
    let find = assets.find(e => e.name == name);
    if(!find) return name;
  
    // check cache 
    if(!checkCache(name)) {
      if (loader.loading) {
        loader.onComplete.once(() => {
          loader.add(name, find.url);
          loader.load();
          cache.push(name);
        });
      } else {
        loader.add(name, find.url);
        loader.load();
        cache.push(name);
      }
    }
  
    return name;
  }
  
  let loadAsset = function(name)
  {
    let find = assets.find(e => e.name == name);
    if(!find) return name;
  
    // check cache 
    if(!checkCache(name))
    {
      loader.add(name, find.url);
      cache.push(name);
  
    }
  
    return name;
  }
  
  
  function load(setup) {
  
    assetEff.forEach(element => {
  
      assets.push({name: element, url: '/assets/map/eff/'+element+'.png'});
      
    });
  
  
    assetCayCoi.forEach(element => {
      
      assets.push({name: element, url: '/assets/map/caycoi/'+element+'.png'});
    });
  
    assetDat.forEach(element => {
  
      assets.push({name: element, url: '/assets/map/dat/'+element+'.png'});
     
    });
  
    assetKhac.forEach(element => {
  
      assets.push({name: element, url: '/assets/map/khac/'+element+'.png'});
   
    });
  
    assetNhaCua.forEach(element => {
     
      assets.push({name: element, url: '/assets/map/nhacua/'+element+'.png'});
    });
  
    assetTrangTri.forEach(element => {
  
      assets.push({name: element, url: '/assets/map/trangtri/'+element+'.png'});
     
    });

    asset18_2_2023.forEach(element => {
  
      assets.push({name: element, url: '/assets/map/khac2/'+element+'.png'});
     
    });

    khac3nek.forEach(element => {
  
      assets.push({name: element, url: '/assets/map/khac3/'+element+'.png'});
     
    });
  
  
    
  
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    } else {
      PC = true;
    }
  
    

    loader.load(since04);
  }
  
  
  function load0(setup) {
  
    assetEff.forEach(element => {
  
      if (!checkCache(element)) {
        loader.add(element,'/assets/map/eff/'+element+'.png');
        cache.push(element);
      }
    });
  
  
    assetCayCoi.forEach(element => {
      if (!checkCache(element)) {
        loader.add(element,'/assets/map/caycoi/'+element+'.png');
        cache.push(element);
      }
    });
  
    assetDat.forEach(element => {
      if (!checkCache(element)) {
        loader.add(element,'/assets/map/dat/'+element+'.png');
        cache.push(element);
      }
    });
  
    assetKhac.forEach(element => {
      if (!checkCache(element)) {
        loader.add(element,'/assets/map/khac/'+element+'.png');
        cache.push(element);
      }
    });
  
    assetNhaCua.forEach(element => {
      if (!checkCache(element)) {
        loader.add(element,'/assets/map/nhacua/'+element+'.png');
        cache.push(element);
      }
    });
  
    assetTrangTri.forEach(element => {
      if (!checkCache(element)) {
        loader.add(element,'/assets/map/trangtri/'+element+'.png');
        cache.push(element);
      }
    });


    asset18_2_2023.forEach(element => {
      if (!checkCache(element)) {
        loader.add(element,'/assets/map/khac2/'+element+'.png');
        cache.push(element);
      }
    });


    khac3nek.forEach(element => {
      if (!checkCache(element)) {
        loader.add(element,'/assets/map/khac3/'+element+'.png');
        cache.push(element);
      }
    });
  
  
    
  
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    } else {
      PC = true;
    }
  
   
  
 
  
  
    loader.load(since04);
  }
  
  load0();
  
  function since04() {
  
      new playGame()
  }
  
  let getImg = (name) => {
    let img = images.find((image) => {
      return image.name == name;
    });
    return img;
  };
  
  let getFarm =  function (name, num) {
    
      if (num == undefined )  {
          let check = getImg(name).farm[0].move.farme[0];
  
        num = check;
      }
  
    loadAsset(name + "_" + num)
  
    return name + "_" + num;
  };
  
  
  // create a new Sprite from an image path
  
  function isChildOfContainer(child, container) {
      let parent = child.parent;
      while (parent) {
        if (parent === container) {
          // child nằm trong container
          return true;
        }
        parent = parent.parent;
      }
      // child không nằm trong container
      return false;
    }
  
     
  
  
    let test = [
          
      {
          'name' :'m5',
          'x' : 48,
          'y' : -1000,
          'type' : 'bautroi',
          'loop_x' : 100,
          'loop_y' : 10, 
          'width' : 516,
          'height' : 154,
          'yy' : 0,
          'xx' : 0,
      },
      {
          'name' :'m4',
          'x' : 48,
          'y' : -40,
          'type' : 'nuixa',
          'loop_x' : 100,
          'loop_y' : 0, 
          'width' : 336,
          'height' : 200,
          'yy' : 0,
          'xx' : 0,
  
      },
  
      {
          'name' :'nuida',
          'x' : 50,
          'y' : 85,
          'type' : 'nuida',
          'loop_x' : 100,
          'loop_y' : 1, 
          'width' : 332,
          'height' : 160,
          'yy' : 0,
          'xx' : 0,
      },
  
      {
          'name' :'hoa',
          'x' : 48,
          'y' : 230,
          'type' : 'hoa',
          'loop_x' : 100,
          'loop_y' : 1, 
          'width' : 112,
          'height' : 28,
          'yy' : 0,
          'xx' : 0,
      },
      {
          'name' :'m1',
          'x' : 48,
          'y' : 252,
          'type' : 'dat',
          'loop_x' : 10,
          'loop_y' : 0, 
          'width' : 48,
          'height' : 48,
          'yy' : 0,
          'xx' : 0,
      },
      {
          'name' :'m2',
          'x' : 54,
          'y' : 18,
          'type' : 'cay',
          'loop_x' : 2,
          'loop_y' : 0,
          'width' : 242,
          'height' : 250,
          'yy' : 0,
          'xx' : 0,
      },
      {
          'name' :'m3',
          'x' : 44,
          'y' : 300,
          'type' : 'longdat',
          'loop_x' : 10,
          'loop_y' : 10, 
          'width' : 48,
          'height' : 48,
          'yy' : -10,
          'xx' : -10,
      },
  ];
  
  
  var data_block = [];
  var block = 1;
  let speed = 5;
  
  let dataAction = [];
  let dataSkill = [];
  let logNotice = [
    "Boss số 4 vừa xuất hiện tại làng auru khu 50",
  ];
  let logChat = [
    {
      id : 'kkdfg',
      uid : 1,
      'text' : 'Chào mừng ngươi tới với thế giới Ngọc Rồng. Ta là Đức Nghĩa, người sẽ đồng hành cùng ngươi trong chuyến hành trình lần này',
    },
  
    {
      id : 'kkdfga',
      uid : 3,
      'text' : 'địt mẹ m',
    }
    , 
    {
      id : 'hgfghgh',
      uid : 2,
      'text' : 'chửi cái lồn tao này',
    }
  ];
  
  // random A-Z
  
  let rand = function(min,max) 
  {
      return Math.floor(Math.random()*(max-min+1)+min);
  
  }
  
  let setting = {
      'mouse' : 0, // id mouse
      'type' : null,
      'blockcanvas' : false,
      'oskill' : -1,
      'setting' : {
        'eff' : true,
      },
      'sprite' : {
        width : 48,
        height : 20,
  
      }
  };
  
  let isMouseDown = false;
      let mouseX = 0;
      let mouseY = 0;
      let movementX = 0;
      let movementY = 0;
      let KeoX = 0;
      let KeoY = 0;
  
  let randomAZ = function (n) {
      let text = "";
      let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  
      for (let i = 0; i < n; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
  
      return text;
  
  }
  
  let danhHieu = function(sucmanh) 
  {
    return 'Tân binh';
  }
  
  
  
  let number_format = function(number) 
  {
      return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
  
  function distancecode(x1, y1, x2, y2) {
      return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  }
  
  let deleteSkill = function (id) {
      // set type = delete
      let check = dataSkill.find(element => element.id === id);
      if (check) {
          check.type = 'delete';
      }
      
  }
  let delAction = function (element) 
  {
    let index = dataAction.indexOf(element);
    if (index > -1) {
        dataAction.splice(index, 1);
    }
  }
  
  let addAction = function(data = null) 
  {
      let obj = {};
      // check exist id
  
      if(data == null) data = {id : my.id, action : my.info.act};
  
      let check = dataAction.find(element => element.id === data.id);
      if (check) {
          if(check.action == data.action)
          return;
          // delete
          delAction(check);
      }
      obj.action = data.action;
      obj.id = data.id;
      dataAction.push(obj);
  }
  
  
  
  let addSkill = function (name,level,startX,startY,aim,type = 'skill', id = null,dame = 0) 
  {
      if (id == null) {
          id = randomAZ(10);
      }
      // check exist id
      let check = dataSkill.find(element => element.id === id);
      if (check) {
          return;
      }
      else 
      {
          dataSkill.push(
              {
              id : id,
              type : type,
              name : name,
              level : level,
              startX : startX,
              startY : startY,
              aim : aim,
              dame : 100,
              }
          )
          return id;
      }
  
  }
  
  let checkSkill = function(name, level) {
    
      const skillElement = skill.find(element => element.name === name);
      if (skillElement) {
        const srcElement = skillElement.src.find(e => e.level === level);
        if (srcElement) {
          return srcElement;
        }
      }
    }
  
  let getNameSkill = function(name,level,num) 
  {
  
      loadAsset(name + "_" + level + "_" + num)
      return name + "_" + level + "_" + num;
  
  }