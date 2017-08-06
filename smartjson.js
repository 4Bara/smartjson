var sJSON='{"array":[1,2,3],"boolean":true,"null":null,"number":123,"object":{"a":"b","c":"d","e":"f"},"string":"Hello World"}';
var parsedJSON = JSON.parse(sJSON);

var sResult='<ul>',
 seperator =':',
 pathSeperator='->',
 isQouted = true;

console.time();
sResult =  '{'+getHTML(parsedJSON,0,0)+'}';
console.timeEnd();
function getHTML(Element,parent,path,index){

    var HTMLResult = '';
      if(Element != null){
        sType=typeof Element;
        if(sType == 'object' && Element.length > 0){
          sType='array';
        }
      }else{
        sType = null;
      }
      if(parent!=0){
        if(path == ''){
            path = parent;
        }else{
        path+=pathSeperator+parent;
      }
      }
      switch(sType){
      case 'array': 
            HTMLResult+='<ul ';
            if(typeof path == 'string'){
            var pathJson = JSON.stringify(path.split(pathSeperator));  
                HTMLResult +=" data-element-full-path='"+pathJson+"' ";
              }
                HTMLResult +=' value="'+parent+'">' +'<li class="list-header">"'+parent+'":</li>[';

        var index = 0;
        for(i in Element){
           HTMLResult += getHTML(Element[i],parent,0,index++);
        }

        HTMLResult+=']</ul>';
      break;
    
      case 'string':
            var li = "<li ";
            if(index!= -1){
              li +=' data-attr-array-index="'+index+'" ';
            } 
            var pathJson = JSON.stringify(path.split(pathSeperator));
            li +=" data-element-full-path='"+pathJson+"' ";
            li +=' data-type="'+sType+'" class="'+sType+'" ';
            // li +=' data-direct-parent="'+parent+'" ';
            li +='>'; 

            if(index == -1){
              li +=' <span class="element-'+sType+'-name">"'+parent+'"</span> ';
              li +=seperator;
            }
            li +=' <span class="element-'+sType+'-value">"'+Element+'"</span>';  
            li +=' </li>';
            HTMLResult+=li;
      break;
      case 'number':
         var li = "<li ";
            if(index!= -1){
              li +=' data-attr-array-index="'+index+'" ';
            } 
            var pathJson = JSON.stringify(path.split(pathSeperator));
            li +=" data-element-full-path='"+pathJson+"' ";
            li +=' data-type="'+sType+'" class="'+sType+'" ';
            // li +=' data-direct-parent="'+parent+'" ';
            li +='>'; 

            if(index == -1){
              li +=' <span class="element-'+sType+'-name">"'+parent+'"</span> ';
              li +=seperator;
            }
            li +=' <span class="element-'+sType+'-value">'+Element+'</span> ';  
            li +=' </li>';
            HTMLResult+=li;
      break;
      case 'boolean':
         var li = "<li ";
            if(index!= -1){
              li +=' data-attr-array-index="'+index+'" ';
            } 
            var pathJson = JSON.stringify(path.split(pathSeperator));
            li +=" data-element-full-path='"+pathJson+"' ";
            li +=' data-type="'+sType+'" class="'+sType+'" ';
            // li +=' data-direct-parent="'+parent+'" ';
            li +='>'; 

            if(index == -1){
              li +=' <span class="element-'+sType+'-name">"'+parent+'"</span> ';
              li +=seperator;
            }
            li +=' <span class="element-'+sType+'-value">'+Element+'</span> ';  
            li +=' </li>';
            HTMLResult+=li;
      break; 
      case  'null':
          HTMLResult += '<li>null</li>';
      break;
      case 'string':
      break;
      case 'object':
          if(parent != 0){
            HTMLResult+='<ul ';
            var pathJson = JSON.stringify(path.split(pathSeperator));  
                        HTMLResult +=" data-element-full-path='"+pathJson+"' ";
                HTMLResult +=' value="'+parent+'">' +'<li class="list-header">"'+parent+'":</li>{';
          }
          for(i in Element){
              // HTMLResult +='<ul value="'++'"> ' + i;
              HTMLResult +=getHTML(Element[i],i,path,-1);
              // HTMLResult+='</ul>';

          }
          if(parent !=0){
            HTMLResult+='}</ul>';
          }     
     break;
  }
      if(parent!=0){
        // HTMLResult+='</li>';
      }
    return  HTMLResult;
}

// console.log();
document.getElementById('view-json').innerHTML=sResult;

function updateBackgroundColor(){
var newBackgroundColor = document.getElementById('background-color-changer').value;
document.getElementById('view-json').style='background-color:'+newBackgroundColor;

}