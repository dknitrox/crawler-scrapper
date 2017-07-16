var request=require('request-promise');

var cheerio=require('cheerio');
var example="<a href='kevin'></a>";

var url='http://es.kenichi.wikia.com';
var domain=url.split('.')[2];
var domains={};
var domains2=[];

request(url)
.then(body=>{


	console.log("dominio",domain);
	var $=cheerio.load(body);

	findx($,'a',domain)
	.then(data=>{
		console.log(data);
		index=Object.keys(data);
		domains2=index;
			const promises=index.map(d=>{
			const urlnew=d+'.'+domain+'.com';
		return request(urlnew);
		})
			console.log("Promise all");
			Promise.all(promises)
			.then(body2=>{
					body2.forEach(us=>{
					$=cheerio.load(us);
					findx($,'a',domain)
					.then(data2=>{
						index=Object.keys(data2);
						return Promise.resolve(domains2.concat(index));
					})
					.then(total=>{
						console.log(total)
					})

				})
			
												
			})
			.catch(err=>{
				console.log("error");
			})
	});


});
function findx($,tag,link2){
return new Promise((resolve,reject)=>{

	$(tag).each((i,link)=>{
		var link2=$(link).attr('href');
		
		if(link2 && link2.search(domain)){
			var position=link2.search(domain);
			var subdomain=link2.substr(0,position-1);
			var reg=new RegExp('[(http|https)://|w|es]$');
			if(subdomain!="" && !reg.test(subdomain)&& domains[subdomain]!=1){
				domains[subdomain]=1;
				
			}
		}
	});
	resolve(domains);
});

}
