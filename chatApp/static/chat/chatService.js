(function () {
    'use strict';

    var app = angular.module('chatService', [
        'auth'
    ])

    .service('Chat', function($http, Auth){
		var interval,
		self = this,
		lastDate;
		this.messages = [];
		this.get = function(lastDate){			
			$http.get('/chat/', {params: {lastDate: lastDate}})
				.then(function(success){
					var exist = false;					
					lastDate = success.data.lastDate;
					success.data.results.forEach(function(item){
						item.created = new Date(item.created);
						item.success = true;
						
						if (item.user__username == Auth.user.username) {
							item.my = true;
						}
						exist = self.messages.some(function(mes){ return mes.id === item.id});
						if (!exist)	self.messages.push(item);
					});
				}, function(err) {					
					console.log("err", err);
				})
		}
		
		this.check = function() {
			lastDate = lastDate || new Date();
			
			self.get(lastDate);
		}
		
		this.create = function(message) {
			var item = {};
			item.text = message;
			item.my = true;
			item.user__username = Auth.user.username;
			item.created = new Date();			
			$http.post('/chat/', {text: message}).
				then(function(success){	
					var data;				
					if (success.data.status) {						
						data = JSON.parse(success.data.results);
						item.created = new Date(data.created);
						item.id = data.id
						item.success = true;
						self.messages.push(item);
					}else {
						item.success = false;
						self.messages.push(item);
					}
				}, function(err){
					item.success = false;
				});
		}
		
		interval = setInterval(this.check, 15000);
		this.get();
	});
})();
