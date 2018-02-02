import React from "react";
import $ from "jquery";
import { router, Route, hashHistory } from 'react-router';
class Xreportcon extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			arr:[],
			arry:[],
			arrr:[]
		}
	}
	toDecimal2(x) { 
		  var f = parseFloat(x); 
		  if (isNaN(f)) { 
		    return false; 
		  } 
		  var f = Math.round(x*100)/100; 
		  var s = f.toString(); 
		  var rs = s.indexOf('.'); 
		  if (rs < 0) { 
		    rs = s.length; 
		    s += '.'; 
		  } 
		  while (s.length <= rs + 2) { 
		    s += '0'; 
		  } 
		  return s; 
		} 
	componentWillMount(){
		var _this = this;
		var date = this.props.date;
		var retype = this.props.retype;
		var arr = date.split("-");
		var sum = 0;
		if($.cookie('user')){
			var id = JSON.parse($.cookie('user')).userid;
		
		var obj = {
			year:arr[0],
			month:arr[1],
			day:arr[2],
			retype:retype,
			id:id
		}
		//年
		$.ajax({
			type:"post",
			url:"http://localhost:1703/giveDate",
			data:obj,
			success:function(data){
				if(data!=''){
					data = JSON.parse(data);
					var arr1 = [{
						name:"餐饮",
						buy:0
					},{
						name:"购物",
						buy:0
					},{
						name:"出行",
						buy:0
					},{
						name:"居住",
						buy:0
					},{
						name:"娱乐",
						buy:0
					},{
						name:"医疗",
						buy:0
					},{
						name:"教育",
						buy:0
					},{
						name:"人情",
						buy:0
					},{
						name:"其他",
						buy:0
					}];
					for(var i in data){
						/*sum+=parseFloat(data[i].reMoney);*/
						switch (data[i].iconType) {
							case 1:
								arr1[0].buy+=(parseFloat(data[i].reMoney)*100);
								break;
							case 2:
								arr1[1].buy+=(parseFloat(data[i].reMoney)*100);
								break;
							case 3:
								arr1[2].buy+=(parseFloat(data[i].reMoney)*100);
								break;
							case 4:
								arr1[3].buy+=(parseFloat(data[i].reMoney)*100);
								break;
							case 5:
								arr1[4].buy+=(parseFloat(data[i].reMoney)*100);
								break;
							case 6:
								arr1[5].buy+=(parseFloat(data[i].reMoney)*100);
								break;
							case 7:
								arr1[6].buy+=(parseFloat(data[i].reMoney)*100);
								break;
							case 8:
								arr1[7].buy+=(parseFloat(data[i].reMoney)*100);
								break;
							case 9:
								arr1[8].buy+=(parseFloat(data[i].reMoney)*100);
								break;
							default:
								console.log("error");
								break;
						}
					}
					for (var j in arr1){
						sum+=arr1[j].buy;
						arr1[j].buy = _this.toDecimal2(arr1[j].buy /= 100);
					}
					sum = _this.toDecimal2(sum /= 100);
					for (var z in arr1){
							if(sum!=0){
								var baifen = parseInt((arr1[z].buy/sum)*10000);
							arr1[z]['zhan'] = _this.toDecimal2(baifen/100)+'%';
						}else{
							arr1[z]['zhan'] = 0+'%';
						}
					}
					_this.setState({
						arr:arr1
					})
					/*console.log(_this.state.arr);*/
				}else{
					console.log("没有找到哦");
				}
			}
		})
		//年月
		$.ajax({
			type:"post",
			url:"http://localhost:1703/giveMonth",
			data:obj,
			success:function(data1){
				var sum1=0;
				if(data1!=''){
					data1 = JSON.parse(data1);
					/*console.log(data1);*/
					var arr1 = [{
						name:"餐饮",
						buy:0
					},{
						name:"购物",
						buy:0
					},{
						name:"出行",
						buy:0
					},{
						name:"居住",
						buy:0
					},{
						name:"娱乐",
						buy:0
					},{
						name:"医疗",
						buy:0
					},{
						name:"教育",
						buy:0
					},{
						name:"人情",
						buy:0
					},{
						name:"其他",
						buy:0
					}];
					for(var i in data1){
						/*sum+=parseFloat(data[i].reMoney);*/
						switch (data1[i].iconType) {
							case 1:
								arr1[0].buy+=(parseFloat(data1[i].reMoney)*100);
								break;
							case 2:
								arr1[1].buy+=(parseFloat(data1[i].reMoney)*100);
								break;
							case 3:
								arr1[2].buy+=(parseFloat(data1[i].reMoney)*100);
								break;
							case 4:
								arr1[3].buy+=(parseFloat(data1[i].reMoney)*100);
								break;
							case 5:
								arr1[4].buy+=(parseFloat(data1[i].reMoney)*100);
								break;
							case 6:
								arr1[5].buy+=(parseFloat(data1[i].reMoney)*100);
								break;
							case 7:
								arr1[6].buy+=(parseFloat(data1[i].reMoney)*100);
								break;
							case 8:
								arr1[7].buy+=(parseFloat(data1[i].reMoney)*100);
								break;
							case 9:
								arr1[8].buy+=(parseFloat(data1[i].reMoney)*100);
								break;
							default:
								console.log("error");
								break;
						}
					}
					for (var j in arr1){
						sum1+=arr1[j].buy;
						arr1[j].buy = _this.toDecimal2(arr1[j].buy /= 100);
					}
					sum1 = _this.toDecimal2(sum1 /= 100);
					for (var z in arr1){
							if(sum1!=0){
								var baifen = parseInt((arr1[z].buy/sum1)*10000);
							arr1[z]['zhan'] = _this.toDecimal2(baifen/100)+'%';
						}else{
							arr1[z]['zhan'] = 0+'%';
						}
					}
					_this.setState({
						arry:arr1
					})
					/*console.log(_this.state.arry);*/
				}else{
					//console.log("没有找到哦");
				}
			}
		})
		//年月日
		$.ajax({
			type:"post",
			url:"http://localhost:1703/giveDay",
			data:obj,
			success:function(data2){
				var sum2=0;
				if(data2!=''){
					data2 = JSON.parse(data2);
					/*console.log(data2);*/
					var arr1 = [{
						name:"餐饮",
						buy:0
					},{
						name:"购物",
						buy:0
					},{
						name:"出行",
						buy:0
					},{
						name:"居住",
						buy:0
					},{
						name:"娱乐",
						buy:0
					},{
						name:"医疗",
						buy:0
					},{
						name:"教育",
						buy:0
					},{
						name:"人情",
						buy:0
					},{
						name:"其他",
						buy:0
					}];
					for(var i in data2){
						/*sum+=parseFloat(data[i].reMoney);*/
						switch (data2[i].iconType) {
							case 1:
								arr1[0].buy+=(parseFloat(data2[i].reMoney)*100);
								break;
							case 2:
								arr1[1].buy+=(parseFloat(data2[i].reMoney)*100);
								break;
							case 3:
								arr1[2].buy+=(parseFloat(data2[i].reMoney)*100);
								break;
							case 4:
								arr1[3].buy+=(parseFloat(data2[i].reMoney)*100);
								break;
							case 5:
								arr1[4].buy+=(parseFloat(data2[i].reMoney)*100);
								break;
							case 6:
								arr1[5].buy+=(parseFloat(data2[i].reMoney)*100);
								break;
							case 7:
								arr1[6].buy+=(parseFloat(data2[i].reMoney)*100);
								break;
							case 8:
								arr1[7].buy+=(parseFloat(data2[i].reMoney)*100);
								break;
							case 9:
								arr1[8].buy+=(parseFloat(data2[i].reMoney)*100);
								break;
							default:
								console.log("error");
								break;
						}
					}
					for (var j in arr1){
						sum2+=arr1[j].buy;
						arr1[j].buy = _this.toDecimal2(arr1[j].buy /= 100);
					}
					sum2 = _this.toDecimal2(sum2 /= 100);
					for (var z in arr1){
							if(sum2!=0){
								var baifen = parseInt((arr1[z].buy/sum2)*10000);
							arr1[z]['zhan'] = _this.toDecimal2(baifen/100)+'%';
						}else{
							arr1[z]['zhan'] = 0+'%';
						}
					}
					_this.setState({
						arrr:arr1
					})
					/*console.log(_this.state.arrr);*/
				}else{
					console.log("没有找到哦");
				}
			}
		})
	}else{
		location.href = "http://localhost:12345/#/reg";
	}
	}
	render(){
		var _this = this;
		return(
			<div style={{textAlign:'center',color:'rgb(237, 79, 78)',marginBottom:'2.8rem'}}>
				日
				{function(){
					var flag = 0;
					return _this.state.arrr.map(function(item,index){
						if(item.buy!="0.00"){
							return <div key={index} className="reportcon">
								<div><p>{item.name}</p></div>
								<div><p>{item.zhan}</p></div>
								<div><p>{item.buy}</p></div>
							</div>
						}else{							
							flag++;
						}
						/*console.log(flag,_this.state.arrr.length);*/
							if(flag==_this.state.arrr.length){
							return <p key={'err'} style={{color:'#999999'}}>亲，没有此日消息哦</p>
						}												
					})
				
				}()}
				月
				{function(){
					var flag = 0;
					return _this.state.arry.map(function(item,index){
						if(item.buy!="0.00"){
							return <div key={index} className="reportcon">
								<div><p>{item.name}</p></div>
								<div><p>{item.zhan}</p></div>
								<div><p>{item.buy}</p></div>
							</div>
						}else{							
							flag++;
						}
						/*console.log(flag,_this.state.arry.length);*/
							if(flag==_this.state.arry.length){
							return <p key={'err'} style={{color:'#999999'}}>亲，没有此月消息哦</p>
						}												
					})
				
				}()}
				年
				{function(){
					var flag = 0;
					return _this.state.arr.map(function(item,index){
						if(item.buy!="0.00"){
							return <div key={index} className="reportcon">
								<div><p>{item.name}</p></div>
								<div><p>{item.zhan}</p></div>
								<div><p>{item.buy}</p></div>
							</div>
						}else{							
							flag++;
						}
						/*console.log(flag,_this.state.arr.length);*/
							if(flag==_this.state.arr.length){
							return <p key={'err'} style={{color:'#999999'}}>亲，没有此年消息哦</p>
						}												
					})
				
				}()}
				
					{/*<div><p>购物</p></div>
					<div><p>100%</p></div>
					<div><p>{this.props.date}</p></div>*/}
			</div>
			
			)
	}

}
export default Xreportcon;
