function ajax(method,url,json,success,error){
	var xml=new XMLHttpRequest()||new ActiveXObject("Microsoft",XMLHTTP);
	var str='';
	for(var key in json){
		str+='&'+key+"="+json[key];
	}
	str=str.substring(1);
	if(method=='get'){
		url=url+'?'+str;
		xml.open('get',url,true);
		xml.send();
	}else{
		xml.open('post',url,true);
		xml.setRequestHeader("content-type","application/x-www-form-urlencoded");
		xml.send(str);
	}

	xml.onreadystatechange = function(){
	if(xml.readyState==4&&xml.status==200){
		var r=xml.responseText;
		if(typeof r!=="object"){
			r=JSON.parse(r);
		}
		success&&success(r);
		
		}else{
			error&&error(xml.status);
		}
	}
}