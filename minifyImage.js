function changeImage(file, resWidth){//文件，缩小后宽度(px)
  var reader = new FileReader();
  
  return new Promise(function (resolve, reject) {
    reader.onload = function(){
      var url=reader.result;
      
      var image = new Image();
  
      image.onload = function() {
        
        var x = 0, y = 0, width = image.width, height = image.height;
        var limitW = resWidth || 375;
        if(resWidth >= width){
          resolve(file);
        }
        
        var $canvas = document.createElement('canvas');
        $canvas.width = limitW;
        $canvas.height = limitW * height / width;
        
        if(!$canvas.getContext){
          resolve(file);
        }
        var ctx = $canvas.getContext('2d');
        ctx.drawImage(image, x, y, width, height, 0, 0, width * (limitW / width), height * (limitW / width));
        
        var data = $canvas.toDataURL(file.type);
        data = data.split(',')[1];
        data = window.atob(data);
        var ia = new Uint8Array(data.length);
        for (var i = 0; i < data.length; i++) {
            ia[i] = data.charCodeAt(i);
        };
        // var blob = new Blob([ia], {type:"image/png"});
        var returnFile = new File([ia], file.name,{type:file.type})
        resolve(returnFile)
      }
      image.onerror = function(){
        resolve(file);
      }
      
      image.src=url;
    };
    reader.onerror = function(){
      resolve(file);
    }

    try{
      reader.readAsDataURL(file);
    }catch (e){
      resolve(file);
    }
  })
}
module.exports = {
  changeImage: changeImage
}
