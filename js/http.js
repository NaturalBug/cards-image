
function getUserData(uid){
	console.log(uid);
	var URLs="http://www.gyrigym.com/gold/getRecid_2.php?uid=1087&gid=22";
	$.ajax({
        type :"GET",
        url  : URLs,
        beforeSend: function(jqXHR, settings) {
		    console.log("GET url: "+settings.url);
		},
		success : function(data) {
			console.log(data);
			var obj = JSON.parse(data);
			var value = obj.value;
			if(value==0) { // 0=錯誤 1=正常
				recid="error";
			}
			else if(value==1){
				recid = obj.msg;
			}
			$('#topLevel').html('過去最高關卡:'+obj.toplevel); 
        	console.log("recid:" + recid);
        },
        error: function (xhr, ajaxOptions, thrownError) {
	        console.log(xhr);
	    },
	    complete: function() {
        	// console.log("complete");
    	}
    });
}

function postData(recid,lnum,scores,ptime,perc){
	var data = {};
	data.recid = recid;
	data.lnum = lnum;
	data.scores = scores;
	data.ptime = ptime;
	data.perc = perc;
	console.log(data);
	$.ajax({
	    type: "POST",
	    url: "http://www.gyrigym.com/gold/setGameData_2.php",
	    data: data,
	    beforeSend: function(jqXHR, settings) {
		    console.log("POST url: "+settings.url);
		},
	    success: function(data){
	    	// console.log("success");
	    	console.log(data);
	    	 
	    	
	    },
	    error: function(xhr) { 
	    	console.log("error");
	    	
    	},
	    complete: function(data) {	    	
	    	     	
    	}
	});	
}

function getGameRecIdScore(recid){
	var data = {};
	data.recid = recid;
	
	console.log(data);
	$.ajax({
	   type:'post',

	    url: "http://www.gyrigym.com/gold/getRecidScore.php?recid="+recid,
	    data: data,
	    beforeSend: function(jqXHR, settings) {
		    console.log("POST url: "+settings.url);
		   
		},
	    success: function(data){
	    	// console.log("success");
	    	console.log(data);
	    	$('#scoretable').html(''); 
	    	$str = ''; 
	    	$blank = '';
	    	$.each(JSON.parse(data),function(i,val){ 

	    		$str = $str + '<tr>'; 
	    		$str = $str + '<td> '+val.GameLevel+' </td>'; 
	    		$str = $str + '<td> '+val.PlayTime+' </td>'; 
	    		$str = $str + '<td> '+val.Percent+' </td>'; 	    		
	    		$str = $str + '</tr>'; 
	    	});

	    	var obj = JSON.parse(data);
			var length = Object.keys(obj).length; 
	    	console.log("json長度"+length);
	    	$j= 10-length;
	    	for($i=1;$i<$j+1;$i++){
	    		$blank= $blank+'<tr><td> '+($i+10-$j)+' </td><td></td><td></td></tr>';
	    	}

	    	$('#scoretable').append('<thead><th>關卡</th><th>平均答題時間(秒)</th><th>正確率(%)</th></thead>');     	
	    	$('#scoretable').append($str); 
	    	$('#scoretable').append($blank); 
	    	
	    	if(data == "" || data.length < 0 || data == "undefined"){ 
	    		$('#scoretable').html('<td colspan="10" style="height:200px;text-align:center;color: #23527c">no data</td>'); 
	    	}

	    	
	    	 
	    },
	    error: function(xhr) { 
	    	console.log("error");
    	},
	    complete: function() {
        	// console.log("complete");
    	}
	});	
}