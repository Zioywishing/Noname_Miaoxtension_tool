game.import("extension", function (lib, game, ui, get, ai, _status) {
	//重置删除扩展的选择
	lib.config.extension_喵喵配件_extensionDeleter1 = "1";

	//改自拓展：《在线更新》
	function miaoFetch(url, options = { timeout: 3000 }) {
		return new Promise((resolve, reject) => {
			/** @type { AbortController | undefined } */
			let myAbortController;
			/** @type { AbortSignal | undefined } */
			let signal = undefined;

			if (typeof window.AbortController == "function") {
				if (options.timeout > 0) {
					myAbortController = new AbortController();
					signal = myAbortController.signal;
					// @ts-ignore
					setTimeout(() => myAbortController.abort(), 5000);
				}
			} else {
				console.warn("设备不支持AbortController");
			}

			fetch(url, { signal })
				.then(response => {
					if (!response.ok) {
						return reject(response);
					}
					resolve(response);
				})
				.catch(reject);
		});
	}

	// 更新拓展
	async function miao_update_extension_js(url, extName){
		// var url = "https://raw.githubusercontent.com/Zioywishing/Noname_Miaoxtension/main/extension.js";
		var text_download = "";
		// var extName = "喵喵喵喵";
		var path = "\\extension\\" + extName + "\\extension.js";
		var time = new Date();
		var path_bak = path + "." + time.valueOf() + ".bak";
		var fileName = "extension.js";
		var fileName_bak = fileName + "." + time.valueOf() + ".bak";
		try {
			var fec = miaoFetch(url);
			fec.catch(err => reject(err));
			await fec
				.then(data => {
					return data.text();
				})
				.then(res => {
					text_download = res;
				});
		} catch (e) {
			return alert("连接出了问题喵:" + e);
		}
		alert("下载成功");
		//电脑端node.js环境下
		if (lib.node && lib.node.fs) {
			path = __dirname + path;
			path_bak = __dirname + path_bak;
			// return alert(path)
			const fs = lib.node.fs;
			//创建备份文件
			try {
				fs.readFile(path, function read(err, data) {
					if (err) {
						throw err;
					}
					if(text_download == data){
						alert('本地和下载的一模一样喵')
					}else{
						fs.appendFile(path_bak, data, function (err) {
							if (err) throw err;
						});
					}
				});
			} catch (e) {
				return alert("备份时：" + e);
			}
			//更新文件
			try {
				fs.writeFileSync(path, text_download);
			} catch (e) {
				return alert("更新extension.js时：" + e);
			}
		}
		//移动端
		else {

			//将内容数据写入到文件中
			function writeFile(fileEntry, dataObj) {
				//创建一个写入对象
				fileEntry.createWriter(function (fileWriter) {
					//文件写入成功
					fileWriter.onwriteend = function () {
						// alert("Successful file read...");
					};

					//文件写入失败
					fileWriter.onerror = function (e) {
						alert("Failed file read: " + e.toString());
					};

					//写入文件
					fileWriter.write(dataObj);
				});
			}


			//备份文件
			game.readFileAsText(
				"extension/" + extName + "/extension.js",
				e => {
					var oldt = e;
					if(text_download == data){
						alert('本地和下载的一模一样喵')
					}else{
						window.resolveLocalFileSystemURL(
							lib.assetURL + "extension/" + extName,
							function (root) {
								root.getFile(
									fileName_bak,
									{ create: true },
									function (fileEntry) {
										var dataObj = new Blob([oldt], { type: "text/plain" });
										//写入文件
										// alert(oldt);
										writeFile(fileEntry, dataObj);
									},
									function (err) {
										alert("创建失败!");
									}
								);
							},
							function (err) {}
						);
					}
					
				},
				() => {}
			);
			
			//更新extension.js
			window.resolveLocalFileSystemURL(
				lib.assetURL + "extension/" + extName,
				function (root) {
					root.getFile(
						"extension.js",
						{ create: true },
						function (fileEntry) {
							var dataObj = new Blob([text_download], { type: "text/plain" });
							//写入文件
							writeFile(fileEntry, dataObj);
						},
						function (err) {
							alert("创建失败!");
						}
					);
				},
				function (err) {}
			);
		}
	}
	// function miaoFetch(url) {
	// 	var p1 = new Promise((resolve, reject)=>{

	// 	})
	// 	var p2 = new Promise((resolve, reject)=>{
	// 		setTimeout(()=>{
	// 			reject('timeout')
	// 		},5000)
	// 	})
	// 	return Promise.race([p1,p2])
	// }

	return {
		name: "喵喵配件",
		content: function (config, pack) {
			// game.moveExtensionToRecyleBin = function (extname) {
			// 	var prefix = "extension_" + extname
			// 	for (var i in lib.config) {
			// 		if (i.indexOf(prefix) == 0) {
			// 			game.saveConfig(i)
			// 		}
			// 	}
			// 	localStorage.removeItem(lib.configprefix + prefix)
			// 	game.deleteDB("data", prefix)
			// 	lib.config.extensions.remove(extname)
			// 	game.saveConfig("extensions", lib.config.extensions)
			// 	var modelist = lib.config.extensionInfo[extname]
			// 	if (modelist) {
			// 		if (modelist.image) {
			// 			for (var i = 0; i < modelist.image.length; i++) {
			// 				game.deleteDB("image", "extension-" + extname + ":" + modelist.image[i])
			// 			}
			// 		}
			// 		if (modelist.mode) {
			// 			for (var i = 0; i < modelist.mode.length; i++) {
			// 				game.clearModeConfig(modelist.mode[i])
			// 			}
			// 		}
			// 		delete lib.config.extensionInfo[extname]
			// 		game.saveConfig("extensionInfo", lib.config.extensionInfo)
			// 	}
			// 	RBPath = __dirname + "/extension/喵喵配件/Recyle Bin"
			// 	if (!lib.node.fs.existsSync(RBPath)) {
			// 		lib.node.fs.mkdirSync(RBPath)
			// 	}
			// 	if (game.download) {
			// 		if (lib.node && lib.node.fs) {
			// 			try {
			// 				var copyFolderSync = function (src, dest) {
			// 					var fs = lib.node.fs
			// 					var exists = fs.existsSync(src)
			// 					var stats = exists && fs.statSync(src)
			// 					var isDirectory = exists && stats.isDirectory()
			// 					if (isDirectory) {
			// 						fs.mkdirSync(dest)
			// 						fs.readdirSync(src).forEach(function (childItemName) {
			// 							copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName))
			// 						})
			// 					} else {
			// 						fs.copyFileSync(src, dest)
			// 					}
			// 				}
			// 				var deleteFolderRecursive = function (path) {
			// 					if (lib.node.fs.existsSync(path)) {
			// 						lib.node.fs.readdirSync(path).forEach(function (file, index) {
			// 							var curPath = path + "/" + file
			// 							if (lib.node.fs.lstatSync(curPath).isDirectory()) {
			// 								deleteFolderRecursive(curPath)
			// 							} else {
			// 								lib.node.fs.unlinkSync(curPath)
			// 							}
			// 						})
			// 						lib.node.fs.rmdirSync(path)
			// 					}
			// 				}
			// 				lib.node.fs.moveSync(__dirname + "/extension/" + extname, RBPath)
			// 				deleteFolderRecursive(__dirname + "/extension/" + extname)
			// 			} catch (e) {}
			// 		} else {
			// 			window.resolveLocalFileSystemURL(lib.assetURL + "extension/" + extname, function (entry) {
			// 				entry.removeRecursively()
			// 			})
			// 		}
			// 	}
			// }
			
			miao_nodelay = function(){
				lib.configMenu.general.config.game_speed = {
					name: "游戏速度",
					init: "nodelay",
					item: {
						vslow: "慢",
						slow: "较慢",
						mid: "中",
						fast: "较快",
						vfast: "快",
						vvfast: "很快",
						nodelay: "无延迟"
					},
					intro: "设置不同游戏操作间的时间间隔"
				};

				//覆写十周年ui与被十周年ui覆写的delay,等1s加载完以后覆写
				setTimeout(()=>{
					decadeUI.delay = num =>{}
					dui.delay = num =>{}
					game.delay = function (time, time2) {
						if (_status.paused) return;
						game.pause();
						if (typeof time != "number") time = 1;
						if (typeof time2 != "number") time2 = 0;
						time = time * lib.config.duration + time2;
						if (lib.config.game_speed == "vvfast") time /= 3;
						if (lib.config.game_speed == "nodelay"){ time = 1}
						_status.timeout = setTimeout(game.resume, time);
					};
				},1000)

				
				game.delayx = function (time, time2) {
					if (typeof time != "number") time = 1;
					switch (lib.config.game_speed) {
						case "vslow":
							time *= 2.5;
							break;
						case "slow":
							time *= 1.5;
							break;
						case "fast":
							time *= 0.7;
							break;
						case "vfast":
							time *= 0.4;
							break;
						case "vvfast":
							time *= 0.2;
							break;
						case "nodelay":
							time = 0;
					}
					return game.delay(time, time2);
				};
				get.delayx = function (num, max) {
					if (typeof num != "number") num = 1;
					if (typeof max != "number") max = Infinity;
					switch (lib.config.game_speed) {
						case "vslow":
							return Math.min(max, 2.5 * num);
						case "slow":
							return Math.min(max, 1.5 * num);
						case "fast":
							return Math.min(max, 0.7 * num);
						case "vfast":
							return Math.min(max, 0.4 * num);
						case "vvfast":
							return Math.min(max, 0.2 * num);
						case "nodelay":
							return 0;
						default:
							return Math.min(max, num);
					}
				};
			}
			if (lib.config.extension_喵喵配件_nodelay) {
				miao_nodelay()
			}
			if (lib.config.extension_喵喵配件_nodeintroFix) {
				get.nodeintro = function (node, simple, evt) {
					var uiintro = ui.create.dialog("hidden", "notouchscroll");
					if (node.classList.contains("player") && !node.name) {
						return uiintro;
					}
					var i, translation, intro, str;
					if (node._nointro) return;
					if (typeof node._customintro == "function") {
						if (node._customintro(uiintro) === false) return;
					} else if (Array.isArray(node._customintro)) {
						var caption = node._customintro[0];
						var content = node._customintro[1];
						if (typeof caption == "function") {
							caption = caption(node);
						}
						if (typeof content == "function") {
							content = content(node);
						}
						uiintro.add(caption);
						uiintro.add('<div class="text center" style="padding-bottom:5px">' + content + "</div>");
					} else if (node.classList.contains("player") || node.linkplayer) {
						if (node.linkplayer) {
							node = node.link;
						}
						var capt = get.translation(node.name);
						if ((lib.character[node.name] && lib.character[node.name][1]) || lib.group.contains(node.group)) {
							capt += "&nbsp;&nbsp;" + (lib.group.contains(node.group) ? get.translation(node.group) : lib.translate[lib.character[node.name][1]]);
						}
						uiintro.add(capt);

						if (lib.characterTitle[node.name]) {
							uiintro.addText(get.colorspan(lib.characterTitle[node.name]));
						}

						if (!node.noclick && (node.isUnderControl() || (!game.observe && game.me && game.me.hasSkillTag("viewHandcard", null, node, true)))) {
							var hs = node.getCards("h");
							if (hs.length) {
								uiintro.add('<div class="text center">手牌</div>');
								uiintro.addSmall(node.getCards("h"));
							}
						}

						var skills = node.getSkills(null, false, false).slice(0);
						var skills2 = game.filterSkills(skills, node);
						if (node == game.me && node.hiddenSkills.length) {
							skills.addArray(node.hiddenSkills);
						}
						for (var i in node.disabledSkills) {
							if (node.disabledSkills[i].length == 1 && node.disabledSkills[i][0] == i + "_awake" && !node.hiddenSkills.contains(i)) {
								skills.add(i);
							}
						}
						for (i = 0; i < skills.length; i++) {
							if (lib.skill[skills[i]] && (lib.skill[skills[i]].nopop || lib.skill[skills[i]].equipSkill)) continue;
							if (lib.translate[skills[i] + "_info"]) {
								translation = lib.translate[skills[i] + "_ab"] || get.translation(skills[i]);
								if (node.forbiddenSkills[skills[i]]) {
									var forbidstr = '<div style="opacity:0.5"><div class="skill">【' + translation + "】</div><div>";
									if (node.forbiddenSkills[skills[i]].length) {
										forbidstr += "（与" + get.translation(node.forbiddenSkills[skills[i]]) + "冲突）<br>";
									} else {
										forbidstr += "（双将禁用）<br>";
									}
									forbidstr += get.skillInfoTranslation(skills[i], node) + "</div></div>";
									uiintro.add(forbidstr);
								} else if (!skills2.contains(skills[i])) {
									if (lib.skill[skills[i]].preHidden && get.mode() == "guozhan") {
										uiintro.add(
											'<div class="text">&ensp;&ensp;&ensp;&thinsp;【' +
												translation +
												"】：" +
												get.skillInfoTranslation(skills[i]).replace(/<br>/gm, "<br>&ensp;&ensp;&ensp;&ensp;") +
												"</div>" +
												'<br><div class="underlinenode on gray" style="position:relative;padding-left:0;padding-top:7px">预亮技能</div></div></div>'
										);
										var underlinenode = uiintro.content.lastChild.querySelector(".underlinenode");
										if (_status.prehidden_skills.contains(skills[i])) {
											underlinenode.classList.remove("on");
										}
										underlinenode.link = skills[i];
										underlinenode.listen(ui.click.hiddenskill);
									}
									// uiintro.add(
									// 	'<div style="opacity:0.5"><div class="skill">【' +
									// 		translation +
									// 		"】</div><div>" +
									// 		get.skillInfoTranslation(skills[i], node) +
									// 		"</div></div>"
									// )
									else
										uiintro.add(
											'<div class="text" style="opacity:0.5">&ensp;&ensp;&ensp;&thinsp;【' +
												translation +
												"】：" +
												get.skillInfoTranslation(skills[i]).replace(/<br>/gm, "<br>&ensp;&ensp;&ensp;&ensp;")
										);
								} else if (lib.skill[skills[i]].temp || !node.skills.contains(skills[i]) || lib.skill[skills[i]].thundertext) {
									if (lib.skill[skills[i]].frequent || lib.skill[skills[i]].subfrequent) {
										uiintro.add(
											'<div class="text">&ensp;&ensp;&ensp;&thinsp;【' +
												translation +
												"】：" +
												get.skillInfoTranslation(skills[i]).replace(/<br>/gm, "<br>&ensp;&ensp;&ensp;&ensp;") +
												'</div><br><div class="underlinenode on gray" style="position:relative;padding-left:0;padding-top:7px">自动发动</div></div></div>'
										);
										var underlinenode = uiintro.content.lastChild.querySelector(".underlinenode");
										if (lib.skill[skills[i]].frequent) {
											if (lib.config.autoskilllist.contains(skills[i])) {
												underlinenode.classList.remove("on");
											}
										}
										if (lib.skill[skills[i]].subfrequent) {
											for (var j = 0; j < lib.skill[skills[i]].subfrequent.length; j++) {
												if (lib.config.autoskilllist.contains(skills[i] + "_" + lib.skill[skills[i]].subfrequent[j])) {
													underlinenode.classList.remove("on");
												}
											}
										}
										if (lib.config.autoskilllist.contains(skills[i])) {
											underlinenode.classList.remove("on");
										}
										underlinenode.link = skills[i];
										underlinenode.listen(ui.click.autoskill2);
									} else {
										uiintro.add(
											'<div><div class="skill thundertext thunderauto">【' +
												translation +
												'】</div><div class="thundertext thunderauto">' +
												get.skillInfoTranslation(skills[i], node) +
												"</div></div>"
										);
									}
								} else if (lib.skill[skills[i]].frequent || lib.skill[skills[i]].subfrequent) {
									// uiintro.add(
									// 	'<div><div class="skill">【' +
									// 		translation +
									// 		"】</div><div>" +
									// 		get.skillInfoTranslation(skills[i], node) +
									// 		'<br><div class="underlinenode on gray" style="position:relative;padding-left:0;padding-top:7px">自动发动</div></div></div>'
									// );
									uiintro.add(
										'<div class="text">&ensp;&ensp;&ensp;&thinsp;【' +
											translation +
											"】：" +
											get.skillInfoTranslation(skills[i]).replace(/<br>/gm, "<br>&ensp;&ensp;&ensp;&ensp;") +
											"</div>" +
											'<div class="text center"><div><div class="underlinenode on gray" style="position:relative;padding-top:7px">>>>>自动发动<<<<</div></div></div>'
									);
									var underlinenode = uiintro.content.lastChild.querySelector(".underlinenode");
									if (lib.skill[skills[i]].frequent) {
										if (lib.config.autoskilllist.contains(skills[i])) {
											underlinenode.classList.remove("on");
										}
									}
									if (lib.skill[skills[i]].subfrequent) {
										for (var j = 0; j < lib.skill[skills[i]].subfrequent.length; j++) {
											if (lib.config.autoskilllist.contains(skills[i] + "_" + lib.skill[skills[i]].subfrequent[j])) {
												underlinenode.classList.remove("on");
											}
										}
									}
									if (lib.config.autoskilllist.contains(skills[i])) {
										underlinenode.classList.remove("on");
									}
									underlinenode.link = skills[i];
									underlinenode.listen(ui.click.autoskill2);
								} else if (lib.skill[skills[i]].clickable && node.isIn() && node.isUnderControl(true)) {
									var intronode = uiintro
										.add(
											'<div><div class="skill">【' +
												translation +
												"】</div><div>" +
												get.skillInfoTranslation(skills[i], node) +
												'<br><div class="menubutton skillbutton" style="position:relative;margin-top:5px">点击发动</div></div></div>'
										)
										.querySelector(".skillbutton");
									if (!_status.gameStarted || (lib.skill[skills[i]].clickableFilter && !lib.skill[skills[i]].clickableFilter(node))) {
										intronode.classList.add("disabled");
										intronode.style.opacity = 0.5;
									} else {
										intronode.link = node;
										intronode.func = lib.skill[skills[i]].clickable;
										intronode.classList.add("pointerdiv");
										intronode.listen(ui.click.skillbutton);
									}
								} else if (lib.skill[skills[i]].nobracket) {
									uiintro.add('<div><div class="skilln">' + get.translation(skills[i]) + "</div><div>" + lib.translate[skills[i] + "_info"] + "</div></div>");
								} else {
									//uiintro.add('<div><div class="skill">【' + translation + "】</div><div>" + get.skillInfoTranslation(skills[i], node) + "</div></div>");
									uiintro.add(
										'<div class="text">&ensp;&ensp;&ensp;&thinsp;【' +
											translation +
											"】：" +
											get.skillInfoTranslation(skills[i]).replace(/<br>/gm, "<br>&ensp;&ensp;&ensp;&ensp;") +
											"</div>"
									);
								}
								if (lib.translate[skills[i] + "_append"]) {
									uiintro._place_text = uiintro.add('<div class="text">' + lib.translate[skills[i] + "_append"] + "</div>");
								}
							}
						}
						// if(get.is.phoneLayout()){
						//     var storage=node.storage;
						//     for(i in storage){
						//      			if(get.info(i)&&get.info(i).intro){
						//      						 intro=get.info(i).intro;
						//      						 if(node.getSkills().concat(lib.skill.global).contains(i)==false&&!intro.show) continue;
						//      						 var name=intro.name?intro.name:get.translation(i);
						//      						 if(typeof name=='function'){
						//      									  name=name(storage[i],node);
						//      						 }
						//      						 translation='<div><div class="skill">『'+name+'』</div><div>';
						//      						 var stint=get.storageintro(intro.content,storage[i],node,null,i);
						//      						 if(stint){
						//      									  translation+=stint+'</div></div>';
						//      									  uiintro.add(translation);
						//      						 }
						//      			}
						//     }
						// }

						if (lib.config.right_range && _status.gameStarted) {
							uiintro.add(ui.create.div(".placeholder"));
							var table, tr, td;
							table = document.createElement("table");
							tr = document.createElement("tr");
							table.appendChild(tr);
							td = document.createElement("td");
							td.innerHTML = "距离";
							tr.appendChild(td);
							td = document.createElement("td");
							td.innerHTML = "手牌";
							tr.appendChild(td);
							td = document.createElement("td");
							td.innerHTML = "行动";
							tr.appendChild(td);
							td = document.createElement("td");
							td.innerHTML = "伤害";
							tr.appendChild(td);

							tr = document.createElement("tr");
							table.appendChild(tr);
							td = document.createElement("td");
							if (node == game.me || !game.me || !game.me.isIn()) {
								td.innerHTML = "-";
							} else {
								var dist1 = get.numStr(Math.max(1, game.me.distanceTo(node)));
								var dist2 = get.numStr(Math.max(1, node.distanceTo(game.me)));
								if (dist1 == dist2) {
									td.innerHTML = dist1;
								} else {
									td.innerHTML = dist1 + "/" + dist2;
								}
							}
							tr.appendChild(td);
							td = document.createElement("td");
							td.innerHTML = node.countCards("h");
							tr.appendChild(td);
							td = document.createElement("td");
							td.innerHTML = node.phaseNumber;
							tr.appendChild(td);
							td = document.createElement("td");
							(function () {
								num = 0;
								for (var j = 0; j < node.stat.length; j++) {
									if (typeof node.stat[j].damage == "number") num += node.stat[j].damage;
								}
								td.innerHTML = num;
							})();
							tr.appendChild(td);
							table.style.width = "calc(100% - 20px)";
							table.style.marginLeft = "10px";

							uiintro.content.appendChild(table);
							if (!lib.config.show_favourite) {
								table.style.paddingBottom = "5px";
							}
						}
						if (!simple || get.is.phoneLayout()) {
							var es = node.getCards("e");
							for (var i = 0; i < es.length; i++) {
								var cardinfo = lib.card[es[i].name];
								if (cardinfo && cardinfo.cardPrompt)
									uiintro.add('<div><div class="skill">' + es[i].outerHTML + "</div><div>" + cardinfo.cardPrompt(es[i]) + "</div></div>");
								else uiintro.add('<div><div class="skill">' + es[i].outerHTML + "</div><div>" + lib.translate[es[i].name + "_info"] + "</div></div>");
								uiintro.content.lastChild.querySelector(".skill>.card").style.transform = "";
							}
							var js = node.getCards("j");
							for (var i = 0; i < js.length; i++) {
								if (js[i].viewAs && js[i].viewAs != js[i].name) {
									uiintro.add(
										'<div><div class="skill">' +
											js[i].outerHTML +
											"</div><div>" +
											lib.translate[js[i].viewAs] +
											"：" +
											lib.translate[js[i].viewAs + "_info"] +
											"</div></div>"
									);
								} else {
									uiintro.add('<div><div class="skill">' + js[i].outerHTML + "</div><div>" + lib.translate[js[i].name + "_info"] + "</div></div>");
								}
								uiintro.content.lastChild.querySelector(".skill>.card").style.transform = "";
							}
							if (get.is.phoneLayout()) {
								var markCoutainer = ui.create.div(".mark-container.marks");
								for (var i in node.marks) {
									var nodemark = node.marks[i].cloneNode(true);
									nodemark.classList.add("pointerdiv");
									nodemark.link = node.marks[i];
									nodemark.style.transform = "";
									markCoutainer.appendChild(nodemark);
									nodemark.listen(function () {
										uiintro.noresume = true;
										var rect = this.link.getBoundingClientRect();
										ui.click.intro.call(this.link, {
											clientX: rect.left + rect.width,
											clientY: rect.top + rect.height / 2
										});
										if (lib.config.touchscreen) {
											uiintro._close();
										}
									});
								}
								if (markCoutainer.childElementCount) {
									uiintro.addText("标记");
									uiintro.add(markCoutainer);
								}
							}
						}
						if (!game.observe && _status.gameStarted && game.me && node != game.me) {
							ui.throwEmotion = [];
							uiintro.addText("发送交互表情");
							var click = function () {
								if (_status.dragged) return;
								if (_status.justdragged) return;
								if (_status.throwEmotionWait) return;
								var emotion = this.link;
								if (game.online) {
									game.send("throwEmotion", node, emotion);
								} else game.me.throwEmotion(node, emotion);
								uiintro._close();
								_status.throwEmotionWait = true;
								setTimeout(
									function () {
										_status.throwEmotionWait = false;
										if (ui.throwEmotion) {
											for (var i of ui.throwEmotion) i.classList.remove("exclude");
										}
									},
									emotion == "flower" || emotion == "egg" ? 500 : 5000
								);
							};
							var td;
							var table = document.createElement("div");
							table.classList.add("add-setting");
							table.style.margin = "0";
							table.style.width = "100%";
							table.style.position = "relative";
							var listi = ["flower", "egg"];
							for (var i = 0; i < listi.length; i++) {
								td = ui.create.div(".menubutton.reduce_radius.pointerdiv.tdnode");
								ui.throwEmotion.add(td);
								if (_status.throwEmotionWait) td.classList.add("exclude");
								td.link = listi[i];
								table.appendChild(td);
								td.innerHTML = "<span>" + get.translation(listi[i]) + "</span>";
								td.addEventListener(lib.config.touchscreen ? "touchend" : "click", click);
							}
							uiintro.content.appendChild(table);
							table = document.createElement("div");
							table.classList.add("add-setting");
							table.style.margin = "0";
							table.style.width = "100%";
							table.style.position = "relative";
							var listi = ["wine", "shoe"];
							if (game.me.storage.zhuSkill_shanli) listi = ["yuxisx", "jiasuo"];
							for (var i = 0; i < listi.length; i++) {
								td = ui.create.div(".menubutton.reduce_radius.pointerdiv.tdnode");
								ui.throwEmotion.add(td);
								if (_status.throwEmotionWait) td.classList.add("exclude");
								td.link = listi[i];
								table.appendChild(td);
								td.innerHTML = "<span>" + get.translation(listi[i]) + "</span>";
								td.addEventListener(lib.config.touchscreen ? "touchend" : "click", click);
							}
							uiintro.content.appendChild(table);
						}
						var modepack = lib.characterPack["mode_" + get.mode()];
						if (
							lib.config.show_favourite &&
							lib.character[node.name] &&
							game.players.contains(node) &&
							(!modepack || !modepack[node.name]) &&
							(!simple || get.is.phoneLayout())
						) {
							var addFavourite = ui.create.div(".text.center.pointerdiv");
							addFavourite.link = node.name;
							if (lib.config.favouriteCharacter.contains(node.name)) {
								addFavourite.innerHTML = "移除收藏";
							} else {
								addFavourite.innerHTML = "添加收藏";
							}
							addFavourite.listen(ui.click.favouriteCharacter);
							uiintro.add(addFavourite);
						}
						if (!simple || get.is.phoneLayout()) {
							if ((lib.config.change_skin || lib.skin) && !node.isUnseen()) {
								var num = 1;
								var introadded = false;
								var createButtons = function (num, avatar2) {
									if (!introadded) {
										introadded = true;
										uiintro.add('<div class="text center">更改皮肤</div>');
									}
									var buttons = ui.create.div(".buttons.smallzoom.scrollbuttons");
									lib.setMousewheel(buttons);
									var nameskin = avatar2 ? node.name2 : node.name1;
									var nameskin2 = nameskin;
									var gzbool = false;
									if (nameskin.indexOf("gz_shibing") == 0) {
										nameskin = nameskin.slice(3, 11);
									} else if (nameskin.indexOf("gz_") == 0) {
										nameskin = nameskin.slice(3);
										gzbool = true;
									}
									for (var i = 0; i <= num; i++) {
										var button = ui.create.div(".button.character.pointerdiv", buttons, function () {
											if (this._link) {
												if (avatar2) {
													lib.config.skin[nameskin] = this._link;
													node.node.avatar2.style.backgroundImage = this.style.backgroundImage;
												} else {
													lib.config.skin[nameskin] = this._link;
													node.node.avatar.style.backgroundImage = this.style.backgroundImage;
												}
											} else {
												delete lib.config.skin[nameskin];
												if (avatar2) {
													if (gzbool && lib.character[nameskin2][4].contains("gzskin") && lib.config.mode_config.guozhan.guozhanSkin)
														node.node.avatar2.setBackground(nameskin2, "character");
													else node.node.avatar2.setBackground(nameskin, "character");
												} else {
													if (gzbool && lib.character[nameskin2][4].contains("gzskin") && lib.config.mode_config.guozhan.guozhanSkin)
														node.node.avatar.setBackground(nameskin2, "character");
													else node.node.avatar.setBackground(nameskin, "character");
												}
											}
											game.saveConfig("skin", lib.config.skin);
										});
										button._link = i;
										if (i) {
											button.setBackgroundImage("image/skin/" + nameskin + "/" + i + ".jpg");
										} else {
											if (gzbool && lib.character[nameskin2][4].contains("gzskin") && lib.config.mode_config.guozhan.guozhanSkin)
												button.setBackground(nameskin2, "character", "noskin");
											else button.setBackground(nameskin, "character", "noskin");
										}
									}
									uiintro.add(buttons);
								};
								var loadImage = function (avatar2) {
									var img = new Image();
									img.onload = function () {
										num++;
										loadImage(avatar2);
									};
									img.onerror = function () {
										num--;
										if (num) {
											createButtons(num, avatar2);
										}
										if (!avatar2) {
											if (!node.classList.contains("unseen2") && node.name2) {
												num = 1;
												loadImage(true);
											}
										}
									};
									var nameskin = avatar2 ? node.name2 : node.name1;
									var nameskin2 = nameskin;
									var gzbool = false;
									if (nameskin.indexOf("gz_shibing") == 0) {
										nameskin = nameskin.slice(3, 11);
									} else if (nameskin.indexOf("gz_") == 0) {
										nameskin = nameskin.slice(3);
										gzbool = true;
									}
									img.src = lib.assetURL + "image/skin/" + nameskin + "/" + num + ".jpg";
								};
								if (lib.config.change_skin) {
									if (!node.isUnseen(0)) {
										loadImage();
									} else if (node.name2) {
										loadImage(true);
									}
								} else {
									setTimeout(function () {
										var nameskin1 = node.name1;
										var nameskin2 = node.name2;
										if (nameskin1 && nameskin1.indexOf("gz_") == 0) {
											nameskin1 = nameskin1.slice(3);
										}
										if (nameskin2 && nameskin2.indexOf("gz_") == 0) {
											nameskin2 = nameskin2.slice(3);
										}
										if (!node.isUnseen(0) && lib.skin[nameskin1]) {
											createButtons(lib.skin[nameskin1]);
										}
										if (!node.isUnseen(1) && lib.skin[nameskin2]) {
											createButtons(lib.skin[nameskin2], true);
										}
									});
								}
							}
						}

						uiintro.add(ui.create.div(".placeholder.slim"));
					} else if (
						node.classList.contains("mark") &&
						node.info &&
						node.parentNode &&
						node.parentNode.parentNode &&
						node.parentNode.parentNode.classList.contains("player")
					) {
						var info = node.info;
						var player = node.parentNode.parentNode;
						if (info.name) {
							if (typeof info.name == "function") {
								var named = info.name(player.storage[node.skill], player);
								if (named) {
									uiintro.add(named);
								}
							} else {
								uiintro.add(info.name);
							}
						} else if (info.name !== false) {
							uiintro.add(get.translation(node.skill));
						}
						if (typeof info.id == "string" && info.id.indexOf("subplayer") == 0 && player.isUnderControl(true) && player.storage[info.id] && !_status.video) {
							var storage = player.storage[info.id];
							uiintro.addText("当前体力：" + storage.hp + "/" + storage.maxHp);
							if (storage.hs.length) {
								uiintro.addText("手牌区");
								uiintro.addSmall(storage.hs);
							}
							if (storage.es.length) {
								uiintro.addText("装备区");
								uiintro.addSmall(storage.es);
							}
						}
						if (typeof info.mark == "function") {
							var stint = info.mark(uiintro, player.storage[node.skill], player);
							if (stint) {
								var placetext = uiintro.add('<div class="text" style="display:inline">' + stint + "</div>");
								if (stint.indexOf('<div class="skill"') != 0) {
									uiintro._place_text = placetext;
								}
								// if(stint.length<=100){
								// 	uiintro.add('<div class="text center">'+stint+'</div>');
								// }
								// else{
								// 	uiintro.add('<div class="text">'+stint+'</div>');
								// }
							}
						} else {
							var stint = get.storageintro(info.content, player.storage[node.skill], player, uiintro, node.skill);
							if (stint) {
								if (stint[0] == "@") {
									uiintro.add('<div class="caption">' + stint.slice(1) + "</div>");
								} else {
									var placetext = uiintro.add('<div class="text" style="display:inline">' + stint + "</div>");
									if (stint.indexOf('<div class="skill"') != 0) {
										uiintro._place_text = placetext;
									}
								}
								// else if(stint.length<=100){
								// 	uiintro.add('<div class="text center">'+stint+'</div>');
								// }
								// else{
								// 	uiintro.add('<div class="text">'+stint+'</div>');
								// }
							}
						}
						uiintro.add(ui.create.div(".placeholder.slim"));
					} else if (node.classList.contains("card")) {
						//卡牌长按介绍
						if (ui.arena.classList.contains("observe") && node.parentNode.classList.contains("handcards")) {
							return;
						}
						var name = node.name;
						if (node.parentNode.cardMod) {
							var moded = false;
							for (var i in node.parentNode.cardMod) {
								var item = node.parentNode.cardMod[i](node);
								if (Array.isArray(item)) {
									moded = true;
									uiintro.add(item[0]);
									uiintro._place_text = uiintro.add('<div class="text" style="display:inline">' + item[1] + "</div>");
								}
							}
							if (moded) return uiintro;
						}
						if (node.link && node.link.name && lib.card[node.link.name]) {
							name = node.link.name;
						}
						if (get.position(node) == "j" && node.viewAs && node.viewAs != name) {
							uiintro.add(get.translation(node.viewAs));
							uiintro.add('<div class="text center">（' + get.translation(get.translation(node)) + "）</div>");
							// uiintro.add(get.translation(node.viewAs)+'<br><div class="text center" style="padding-top:5px;">（'+get.translation(node)+'）</div>');
							uiintro.nosub = true;
							name = node.viewAs;
						} else {
							uiintro.add(get.translation(node));
						}
						if (node._banning) {
							var clickBanned = function () {
								var banned = lib.config[this.bannedname] || [];
								if (banned.contains(name)) {
									banned.remove(name);
								} else {
									banned.push(name);
								}
								game.saveConfig(this.bannedname, banned);
								this.classList.toggle("on");
								if (node.updateBanned) {
									node.updateBanned();
								}
							};
							var modeorder = lib.config.modeorder || [];
							for (var i in lib.mode) {
								modeorder.add(i);
							}
							var list = [];
							uiintro.contentContainer.listen(function (e) {
								ui.click.touchpop();
								e.stopPropagation();
							});
							for (var i = 0; i < modeorder.length; i++) {
								if (node._banning == "online") {
									if (!lib.mode[modeorder[i]].connect) continue;
								} else if (modeorder[i] == "connect" || modeorder[i] == "brawl") {
									continue;
								}
								if (lib.config.all.mode.contains(modeorder[i])) {
									list.push(modeorder[i]);
								}
							}
							if (lib.card[name] && lib.card[name].type == "trick") list.push("zhinang_tricks");
							var page = ui.create.div(".menu-buttons.configpopped", uiintro.content);
							var banall = false;
							for (var i = 0; i < list.length; i++) {
								var cfg = ui.create.div(".config", list[i] == "zhinang_tricks" ? "设为智囊" : lib.translate[list[i]] + "模式", page);
								cfg.classList.add("toggle");
								if (list[i] == "zhinang_tricks") {
									cfg.bannedname = (node._banning == "offline" ? "" : "connect_") + "zhinang_tricks";
								} else if (node._banning == "offline") {
									cfg.bannedname = list[i] + "_bannedcards";
								} else {
									cfg.bannedname = "connect_" + list[i] + "_bannedcards";
								}
								cfg.listen(clickBanned);
								ui.create.div(ui.create.div(cfg));
								var banned = lib.config[cfg.bannedname] || [];
								if (banned.contains(name) == (list[i] == "zhinang_tricks")) {
									cfg.classList.add("on");
									banall = true;
								}
							}
							ui.create.div(".menubutton.pointerdiv", banall ? "全部禁用" : "全部启用", uiintro.content, function () {
								if (this.innerHTML == "全部禁用") {
									for (var i = 0; i < page.childElementCount; i++) {
										if (
											page.childNodes[i].bannedname.indexOf("zhinang_tricks") == -1 &&
											page.childNodes[i].bannedname &&
											page.childNodes[i].classList.contains("on")
										) {
											clickBanned.call(page.childNodes[i]);
										}
									}
									this.innerHTML = "全部启用";
								} else {
									for (var i = 0; i < page.childElementCount; i++) {
										if (
											page.childNodes[i].bannedname.indexOf("zhinang_tricks") == -1 &&
											page.childNodes[i].bannedname &&
											!page.childNodes[i].classList.contains("on")
										) {
											clickBanned.call(page.childNodes[i]);
										}
									}
									this.innerHTML = "全部禁用";
								}
							}).style.marginTop = "-10px";
							ui.create.div(".placeholder.slim", uiintro.content);
						} else {
							if (lib.translate[name + "_info"]) {
								if (!uiintro.nosub) {
									if (get.subtype(name) == "equip1") {
										var added = false;
										if (lib.card[node.name] && lib.card[node.name].distance) {
											var dist = lib.card[node.name].distance;
											if (dist.attackFrom) {
												added = true;
												uiintro.add('<div class="text center">攻击范围：' + (-dist.attackFrom + 1) + "</div>");
											}
										}
										if (!added) {
											uiintro.add('<div class="text center">攻击范围：1</div>');
										}
									} else if (get.subtype(name)) {
										uiintro.add('<div class="text center">' + get.translation(get.subtype(name)) + "</div>");
									} else if (lib.card[name] && lib.card[name].addinfomenu) {
										uiintro.add('<div class="text center">' + lib.card[name].addinfomenu + "</div>");
									} else if (lib.card[name] && lib.card[name].derivation) {
										if (typeof lib.card[name].derivation == "string") {
											uiintro.add('<div class="text center">来源：' + get.translation(lib.card[name].derivation) + "</div>");
										} else if (lib.card[name].derivationpack) {
											uiintro.add('<div class="text center">来源：' + get.translation(lib.card[name].derivationpack + "_card_config") + "包</div>");
										}
									} else {
										if (lib.card[name].unique) {
											uiintro.add('<div class="text center">特殊' + get.translation(lib.card[name].type) + "牌</div>");
										} else {
											if (lib.card[name].type && lib.translate[lib.card[name].type])
												uiintro.add('<div class="text center">' + get.translation(lib.card[name].type) + "牌</div>");
										}
									}
									if (lib.card[name].unique && lib.card[name].type == "equip") {
										if (lib.cardPile.guozhan && lib.cardPack.guozhan.contains(name)) {
											uiintro.add('<div class="text center">专属装备</div>').style.marginTop = "-5px";
										} else {
											uiintro.add('<div class="text center">特殊装备</div>').style.marginTop = "-5px";
										}
									}
								}
								if (lib.card[name].cardPrompt) {
									var str = lib.card[name].cardPrompt(node.link || node),
										placetext = uiintro.add('<div class="text" style="display:inline">' + str + "</div>");
									if (str.indexOf('<div class="skill"') != 0) {
										uiintro._place_text = placetext;
									}
								} else if (lib.translate[name + "_info"]) {
									var placetext = uiintro.add('<div class="text" style="display:inline">' + lib.translate[name + "_info"] + "</div>");
									if (lib.translate[name + "_info"].indexOf('<div class="skill"') != 0) {
										uiintro._place_text = placetext;
									}
								}
								if (lib.card[name].yingbian_prompt && get.is.yingbian(node.link || node)) {
									if (typeof lib.card[name].yingbian_prompt == "function")
										uiintro.add('<div class="text" style="font-family: yuanli">应变：' + lib.card[name].yingbian_prompt(node.link || node) + "</div>");
									else uiintro.add('<div class="text" style="font-family: yuanli">应变：' + lib.card[name].yingbian_prompt + "</div>");
								}
								if (lib.translate[name + "_append"]) {
									uiintro.add('<div class="text" style="display:inline">' + lib.translate[name + "_append"] + "</div>");
								}
							}
							uiintro.add(ui.create.div(".placeholder.slim"));
						}
					} else if (node.classList.contains("character")) {
						var character = node.link;
						if (lib.character[node.link] && lib.character[node.link][1]) {
							var group = get.is.double(node.link, true);
							if (group) {
								var str = get.translation(character) + "&nbsp;&nbsp;";
								for (var i = 0; i < group.length; i++) {
									str += get.translation(group[i]);
									if (i < group.length - 1) str += "/";
								}
								uiintro.add(str);
							} else uiintro.add(get.translation(character) + "&nbsp;&nbsp;" + lib.translate[lib.character[node.link][1]]);
						} else {
							uiintro.add(get.translation(character));
						}

						if (lib.characterTitle[node.link]) {
							uiintro.addText(get.colorspan(lib.characterTitle[node.link]));
						}

						if (node._banning) {
							var clickBanned = function () {
								var banned = lib.config[this.bannedname] || [];
								if (banned.contains(character)) {
									banned.remove(character);
								} else {
									banned.push(character);
								}
								game.saveConfig(this.bannedname, banned);
								this.classList.toggle("on");
								if (node.updateBanned) {
									node.updateBanned();
								}
							};
							var modeorder = lib.config.modeorder || [];
							for (var i in lib.mode) {
								modeorder.add(i);
							}
							var list = [];
							uiintro.contentContainer.listen(function (e) {
								ui.click.touchpop();
								e.stopPropagation();
							});
							for (var i = 0; i < modeorder.length; i++) {
								if (node._banning == "online") {
									if (!lib.mode[modeorder[i]].connect) continue;
									if (!lib.config["connect_" + modeorder[i] + "_banned"]) {
										lib.config["connect_" + modeorder[i] + "_banned"] = [];
									}
								} else if (modeorder[i] == "connect" || modeorder[i] == "brawl") {
									continue;
								}
								if (lib.config.all.mode.contains(modeorder[i])) {
									list.push(modeorder[i]);
								}
							}
							var page = ui.create.div(".menu-buttons.configpopped", uiintro.content);
							var banall = false;
							for (var i = 0; i < list.length; i++) {
								var cfg = ui.create.div(".config", lib.translate[list[i]] + "模式", page);
								cfg.classList.add("toggle");
								if (node._banning == "offline") {
									cfg.bannedname = list[i] + "_banned";
								} else {
									cfg.bannedname = "connect_" + list[i] + "_banned";
								}
								cfg.listen(clickBanned);
								ui.create.div(ui.create.div(cfg));
								var banned = lib.config[cfg.bannedname] || [];
								if (!banned.contains(character)) {
									cfg.classList.add("on");
									banall = true;
								}
							}
							if (node._banning == "offline") {
								var cfg = ui.create.div(".config", "随机选将可用", page);
								cfg.classList.add("toggle");
								cfg.listen(function () {
									this.classList.toggle("on");
									if (this.classList.contains("on")) {
										lib.config.forbidai_user.remove(character);
									} else {
										lib.config.forbidai_user.add(character);
									}
									game.saveConfig("forbidai_user", lib.config.forbidai_user);
								});
								ui.create.div(ui.create.div(cfg));
								if (!lib.config.forbidai_user.contains(character)) {
									cfg.classList.add("on");
								}
							}
							ui.create.div(".menubutton.pointerdiv", banall ? "全部禁用" : "全部启用", uiintro.content, function () {
								if (this.innerHTML == "全部禁用") {
									for (var i = 0; i < page.childElementCount; i++) {
										if (page.childNodes[i].bannedname && page.childNodes[i].classList.contains("on")) {
											clickBanned.call(page.childNodes[i]);
										}
									}
									this.innerHTML = "全部启用";
								} else {
									for (var i = 0; i < page.childElementCount; i++) {
										if (page.childNodes[i].bannedname && !page.childNodes[i].classList.contains("on")) {
											clickBanned.call(page.childNodes[i]);
										}
									}
									this.innerHTML = "全部禁用";
								}
							}).style.marginTop = "-10px";
							ui.create.div(".placeholder.slim", uiintro.content);
						} else {
							var infoitem = lib.character[character];
							if (!infoitem) {
								for (var itemx in lib.characterPack) {
									if (lib.characterPack[itemx][character]) {
										infoitem = lib.characterPack[itemx][character];
										break;
									}
								}
							}
							var skills = infoitem[3];
							for (i = 0; i < skills.length; i++) {
								if (lib.translate[skills[i] + "_info"]) {
									translation = lib.translate[skills[i] + "_ab"] || get.translation(skills[i]);
									/*原: translation=lib.translate[skills[i]+'_ab']||get.translation(skills[i]).slice(0,2); */
									var fix = "";
									for (let i = 0; i < 4 - 2; i++) {
										fix += "    ";
									}
									if (lib.skill[skills[i]] && lib.skill[skills[i]].nobracket) {
										// uiintro.add(
										// 	'<div><div class="skilln">' + get.translation(skills[i]) + "</div><div>" + get.skillInfoTranslation(skills[i]).replace(/<br>/gm,'<br>&ensp;&ensp;&ensp;&ensp;') + "</div></div>"
										// );
										uiintro.add(
											'<div class="text">&ensp;&ensp;&ensp;&thinsp;【' +
												translation +
												"】：" +
												get.skillInfoTranslation(skills[i]).replace(/<br>/gm, "<br>&ensp;&ensp;&ensp;&ensp;") +
												"</div>"
										);
									} else {
										// uiintro.add('<div><div class="skill">【' + translation + "】</div><div>" + get.skillInfoTranslation(skills[i]).replace(/<br>/gm,'<br>&ensp;&ensp;&ensp;&ensp;') + "</div></div>");
										// uiintro.add('<div class="text">&ensp;&ensp;&ensp;&thinsp;【<span style="font-family:yuanli">' + translation + "</span>】：" + get.skillInfoTranslation(skills[i]).replace(/<br>/gm,'<br>&ensp;&ensp;&ensp;&ensp;') + "</div>");
										uiintro.add(
											'<div class="text">&ensp;&ensp;&ensp;&thinsp;【' +
												translation +
												"】：" +
												get.skillInfoTranslation(skills[i]).replace(/<br>/gm, "<br>&ensp;&ensp;&ensp;&ensp;") +
												"</div>"
										);
									}
									if (lib.translate[skills[i] + "_append"]) {
										// uiintro._place_text = uiintro.add('<div class="text">' + lib.translate[skills[i] + "_append"] + "</div>");
										uiintro.add(
											'<div class="text">&ensp;&ensp;&ensp;&thinsp;【' +
												translation +
												"】：" +
												get.skillInfoTranslation(skills[i]).replace(/<br>/gm, "<br>&ensp;&ensp;&ensp;&ensp;") +
												"</div>"
										);
									}
								}
							}
							var modepack = lib.characterPack["mode_" + get.mode()];
							if (lib.config.show_favourite && lib.character[node.link] && (!modepack || !modepack[node.link]) && (!simple || get.is.phoneLayout())) {
								var addFavourite = ui.create.div(".text.center.pointerdiv");
								addFavourite.link = node.link;
								addFavourite.style.marginBottom = "15px";
								if (lib.config.favouriteCharacter.contains(node.link)) {
									addFavourite.innerHTML = "移除收藏";
								} else {
									addFavourite.innerHTML = "添加收藏";
								}
								addFavourite.listen(ui.click.favouriteCharacter);
								uiintro.add(addFavourite);
							} else {
								uiintro.add(ui.create.div(".placeholder.slim"));
							}
							var addskin = false;
							if (node.parentNode.classList.contains("menu-buttons")) {
								addskin = !lib.config.show_charactercard;
							} else {
								addskin = lib.config.change_skin || lib.skin;
							}
							if (addskin && (!simple || get.is.phoneLayout())) {
								var num = 1;
								var introadded = false;
								var nameskin = node.link;
								var nameskin2 = nameskin;
								var gzbool = false;
								if (nameskin.indexOf("gz_shibing") == 0) {
									nameskin = nameskin.slice(3, 11);
								} else if (nameskin.indexOf("gz_") == 0) {
									nameskin = nameskin.slice(3);
									gzbool = true;
								}
								var createButtons = function (num) {
									if (!num) return;
									if (!introadded) {
										introadded = true;
										uiintro.add('<div class="text center">更改皮肤</div>');
									}
									var buttons = ui.create.div(".buttons.smallzoom.scrollbuttons");
									lib.setMousewheel(buttons);
									for (var i = 0; i <= num; i++) {
										var button = ui.create.div(".button.character.pointerdiv", buttons, function () {
											if (this._link) {
												lib.config.skin[nameskin] = this._link;
												node.style.backgroundImage = this.style.backgroundImage;
												game.saveConfig("skin", lib.config.skin);
											} else {
												delete lib.config.skin[nameskin];
												if (gzbool && lib.character[nameskin2][4].contains("gzskin") && lib.config.mode_config.guozhan.guozhanSkin)
													node.setBackground(nameskin2, "character");
												else node.setBackground(nameskin, "character");
												game.saveConfig("skin", lib.config.skin);
											}
										});
										button._link = i;
										if (i) {
											button.setBackgroundImage("image/skin/" + nameskin + "/" + i + ".jpg");
										} else {
											if (gzbool && lib.character[nameskin2][4].contains("gzskin") && lib.config.mode_config.guozhan.guozhanSkin)
												button.setBackground(nameskin2, "character", "noskin");
											else button.setBackground(nameskin, "character", "noskin");
										}
									}
									uiintro.add(buttons);
								};
								var loadImage = function () {
									var img = new Image();
									img.onload = function () {
										num++;
										loadImage();
									};
									img.onerror = function () {
										num--;
										createButtons(num);
									};
									img.src = lib.assetURL + "image/skin/" + nameskin + "/" + num + ".jpg";
								};
								if (lib.config.change_skin) {
									loadImage();
								} else {
									setTimeout(function () {
										createButtons(lib.skin[nameskin]);
									});
								}
							}
						}
					} else if (node.classList.contains("equips") && ui.arena.classList.contains("selecting")) {
						(function () {
							uiintro.add("选择装备");
							uiintro.addSmall(Array.from(node.childNodes), true);
							uiintro.clickintro = true;
							ui.control.hide();
							uiintro._onclose = function () {
								ui.control.show();
							};
							var confirmbutton;
							for (var i = 0; i < uiintro.buttons.length; i++) {
								var button = uiintro.buttons[i];
								button.classList.add("pointerdiv");
								if (button.link.classList.contains("selected")) {
									button.classList.add("selected");
								}
								button.listen(function (e) {
									ui.click.card.call(this.link, "popequip");
									ui.click.window.call(ui.window, e);
									if (this.link.classList.contains("selected")) {
										this.classList.add("selected");
									} else {
										this.classList.remove("selected");
									}
									if (ui.confirm && ui.confirm.str && ui.confirm.str.indexOf("o") != -1) {
										confirmbutton.classList.remove("disabled");
									} else {
										confirmbutton.classList.add("disabled");
									}
								});
							}
							var buttoncontainer = uiintro.add(ui.create.div());
							buttoncontainer.style.display = "block";
							confirmbutton = ui.create.div(
								".menubutton.large.pointerdiv",
								"确定",
								function () {
									if (ui.confirm && ui.confirm.str && ui.confirm.str.indexOf("o") != -1) {
										uiintro._clickintro();
										ui.click.ok(ui.confirm.firstChild);
									}
								},
								buttoncontainer
							);
							confirmbutton.style.position = "relative";
							setTimeout(function () {
								if (ui.confirm && ui.confirm.str && ui.confirm.str.indexOf("o") != -1) {
									confirmbutton.classList.remove("disabled");
								} else {
									confirmbutton.classList.add("disabled");
								}
							}, 300);
						})();
					} else if (node.classList.contains("identity") && node.dataset.career) {
						var career = node.dataset.career;
						uiintro.add(get.translation(career));
						uiintro.add('<div class="text center" style="padding-bottom:5px">' + lib.translate["_" + career + "_skill_info"] + "</div>");
					} else if (node.classList.contains("skillbar")) {
						if (node == ui.friendBar) {
							uiintro.add("友方怒气值");
							uiintro.add('<div class="text center" style="padding-bottom:5px">' + _status.friendRage + "/100</div>");
						} else if (node == ui.enemyBar) {
							uiintro.add("敌方怒气值");
							uiintro.add('<div class="text center" style="padding-bottom:5px">' + _status.enemyRage + "/100</div>");
						}
					} else if (node.parentNode == ui.historybar) {
						if (node.dead) {
							if (!node.source || node.source == node.player) {
								uiintro.add('<div class="text center">' + get.translation(node.player) + "阵亡</div>");
								uiintro.addSmall([node.player]);
							} else {
								uiintro.add('<div class="text center">' + get.translation(node.player) + "被" + get.translation(node.source) + "杀害</div>");
								uiintro.addSmall([node.source]);
							}
						}
						if (node.skill) {
							uiintro.add('<div class="text center">' + get.translation(node.skill, "skill") + "</div>");
							uiintro._place_text = uiintro.add('<div class="text" style="display:inline">' + get.translation(node.skill, "info") + "</div>");
						}
						if (node.targets && get.itemtype(node.targets) == "players") {
							uiintro.add('<div class="text center">目标</div>');
							uiintro.addSmall(node.targets);
						}
						if (node.players && node.players.length > 1) {
							uiintro.add('<div class="text center">使用者</div>');
							uiintro.addSmall(node.players);
						}
						if (node.cards && node.cards.length) {
							uiintro.add('<div class="text center">卡牌</div>');
							uiintro.addSmall(node.cards);
						}
						for (var i = 0; i < node.added.length; i++) {
							uiintro.add(node.added[i]);
						}
						if (node.added.length) {
							uiintro.add(ui.create.div(".placeholder.slim"));
						}
						if (uiintro.content.firstChild) {
							uiintro.content.firstChild.style.paddingTop = "3px";
						}
					}
					if (lib.config.touchscreen) {
						lib.setScroll(uiintro.contentContainer);
					}
					return uiintro;
				};
			}
		},
		precontent: function () {},
		help: {},
		config: {
			nodelay: {
				name: "无延迟模式",
				intro: "开启此选项后游戏速度可选择无延迟，大大加快ai出牌速度。",
				init: true
			},
			nodeintroFix: {
				name: "get.nodeintro修正",
				intro: "开启此选项可正确显示超过2个字的技能名称。仅测试了军八环境",
				init: true
			},

			//存在风险

			// deleteExrensionFile: {
			// 	name: "▼是否删除文件▼",
			// 	intro: "关闭时流氓扩展删除器只会卸载拓展",
			// 	init: false
			// },
			// extensionDeleter1: {
			// 	name: "流氓扩展删除器>>>",
			// 	init: "1",
			// 	intro: "可以用来删除那些没有“删除此扩展”选项的扩展",
			// 	item: function () {
			// 		var l = { "1": "选择扩展" }
			// 		var num = 2
			// 		for (let i in lib.extensionMenu) {
			// 			if (i.length > 9) {
			// 				l["" + num] = i.slice(10)
			// 				num++
			// 			}
			// 		}
			// 		return l
			// 	},
			// 	textMenu: function (node, link) {
			// 		lib.setScroll(node.parentNode)
			// 		node.parentNode.style.transform = "translateY(-100px)"
			// 		node.parentNode.style.height = "500px"
			// 		node.parentNode.style.width = "300px"
			// 		var l = ["选择扩展"]
			// 		for (let i in lib.extensionMenu) {
			// 			if (i.length > 9) l.push(i.slice(10))
			// 		}
			// 		node.innerHTML = l[link - 1]
			// 	}
			// },
			// extensionDeleter2: {
			// 	name: "<button>删除流氓扩展</button>",
			// 	intro: "这还用说？？？？",
			// 	clear: true,
			// 	onclick: function () {
			// 		var l = { "1": "选择扩展" }
			// 		var num = 2
			// 		for (let i in lib.extensionMenu) {
			// 			if (i.length > 9) {
			// 				l[num] = i.slice(10)
			// 				num++
			// 			}
			// 		}
			// 		if(lib.config.extension_喵喵配件_extensionDeleter1 == '1'){
			// 			return;
			// 		}
			// 		if (!this.count || this.pre_delete != l[lib.config.extension_喵喵配件_extensionDeleter1]) {
			// 			this.count = 1;
			// 			this.pre_delete = l[lib.config.extension_喵喵配件_extensionDeleter1];
			// 			this.innerHTML = "<button>确认删除=>"+this.pre_delete+"?</button><br>继续点击3次以确认删除";
			// 			if(lib.config.extension_喵喵配件_deleteExrensionFile){
			// 				this.innerHTML = this.innerHTML + '<br>这会彻底删除扩展的文件'
			// 			}
			// 		}
			// 		else if (this.count < 3) {
			// 			this.count +=1;
			// 			this.innerHTML = "<button>再点击" + (4-this.count) + "次以确认删除=>"+this.pre_delete+'</button>';
			// 		}
			// 		else if (this.count == 3) {
			// 			delete this.count;
			// 			// game.moveExtensionToRecyleBin(this.pre_delete);
			// 			game.removeExtension(this.pre_delete,lib.config.extension_喵喵配件_deleteExrensionFile);
			// 			this.innerHTML = "<button>删除流氓扩展</button><br>已删除=>"+this.pre_delete;
			// 		}
			// 	}
			// },
			line1: {
				name: "------------",
				clear: true
			},
			updateMiao4: {
				name: "<button>更新喵喵喵喵</button>",
				intro: "这还用说？？？？",
				clear: true,
				onclick: async function () {
					if (!game.getExtensionConfig("喵喵喵喵", "enable")) {
						alert("未安装喵喵喵喵拓展");
						return;
					}
					if (this.innerHTML != "<span><button>更新喵喵喵喵</button></span>") {
						return alert("已经在更新了");
					}
					this.innerHTML = "<button>更新中</button>";
					var url = "https://raw.githubusercontent.com/Zioywishing/Noname_Miaoxtension/main/extension.js";
					var extName = "喵喵喵喵";
					miao_update_extension_js(url,extName)
					alert("更新完成");
					this.innerHTML = "<span><button>更新喵喵喵喵</button></span>";
				}
			},

			updateSelf: {
				name: "<button>更新喵喵配件</button>",
				intro: "这还用说？？？？",
				clear: true,
				onclick: async function () {
					if (this.innerHTML != "<span><button>更新喵喵配件</button></span>") {
						return alert("已经在更新了");
					}
					this.innerHTML = "<button>更新中</button>";
					miao_update_extension_js("https://raw.githubusercontent.com/Zioywishing/Noname_Miaoxtension_tool/main/extension.js",'喵喵配件')
					alert("更新完成");
					this.innerHTML = "<span><button>更新喵喵配件</button></span>";
				}
			},
			// getFastestUpdateURLMiao4:{
			// 	onclick:getFastestUpdateURLMiao4,
			// 	clear:true,
			// 	name: "<button>测试连接更新源</button>",
			// },
			line2: {
				name: "------------",
				clear: true
			},
			globalStatusIntro: {
				name: '<div class="miao">全局状态机制介绍<font size="4px">▶▶▶</font></div>',
				clear: true,
				onclick: function () {
					if (this.globalStatusIntro == undefined) {
						var more = ui.create.div(
							".globalStatusIntro",
							'<div style="border:2px solid gray">' +
								"<br><font size='5px'><b>全局状态</b></font><br><P align=left>&ensp;&ensp;&ensp;&ensp;考虑到目前的强度膨胀速度过于缓慢，没有办法跟上官方的速度，" +
								"所以（因为没有什么创意所以抄袭了洛克王国的天气/环境机制）加入了全局状态（GlobalStatus,我也不知道对不对，以下简称状态）系统。规则如下：" +
								"<br><br>&ensp;&ensp;&ensp;&ensp;状态相当于一个全局技能（GlobalSkill）同时拥有以下属性/方法：" +
								'<br><br>---><font size="3px" color="blue">状态类型</font>：如天气，环境等等。后面会用到。' +
								'<br><br>---><font size="3px" color="blue">召唤状态</font>：若场上状态未锁定且满足无天气或状态类型相同中一项，则可以成功召唤状态。' +
								"召唤状态时若场上有非锁定的同类型状态则会覆盖状态。召唤无状态即为清除全局状态。例：场上存在3回合的细雨天气，若召唤4回合的热浪天气则会" +
								"令场上为4回合热浪天气，细雨天气被清除。若召唤迷嶂环境，由于状态类型不同导致召唤失败，场上仍为细雨天气。" +
								'<br><br>---><font size="3px" color="blue">持续时间</font>：在到达持续时间后会强制清除状态，例：剩余5回合的细雨天气会生效5回合并在第6回合的回合开始阶段消失。' +
								'<br><br>---><font size="3px" color="blue">锁定时间</font>：在到达锁定时间之前当前状态无法被其他全局状态非强制更改，例：当前有锁定3回合的细雨天气，如果此时' +
								"有角色非强制召唤热浪天气，则会召唤失败。锁定时间不大于持续时间。" +
								'<br><br>---><font size="3px" color="blue">清除状态</font>：场上状态非锁定则清除场上状态，过于简单无需举例。' +
								'<br><br>---><font size="3px" color="blue">强制召唤/清除</font>：无视条件召唤/清除状态，例：当前有锁定3回合的细雨天气，若强制召唤2回合迷嶂环境，则令场上为2回合迷嶂环境，细雨天气被覆盖。' +
								"</div>"
						);
						this.parentNode.insertBefore(more, this.nextSibling);
						this.globalStatusIntro = more;
						this.innerHTML = '<div class="miao">全局状态机制介绍<font size="4px">▼▼▼</font></div>';
					} else {
						this.parentNode.removeChild(this.globalStatusIntro);
						delete this.globalStatusIntro;
						this.innerHTML = '<div class="miao">全局状态机制介绍<font size="4px">▶▶▶</font></div>';
					}
				}
			},
			globalStatusLib: {
				name: '<div class="miao">全局状态一览<font size="4px">▶▶▶</font></div>',
				clear: true,
				onclick: function () {
					if (this.globalStatusLib == undefined) {
						var str = "<br>",
							flag = false;
						for (var i in lib.globalStatusTypeTranslation) {
							if (flag == false) {
								flag = true;
							} else {
								str += "<br><br>";
							}
							str += '<font size="5px">====== ' + lib.globalStatusTypeTranslation[i] + " ======<br></font>";
							for (var j in lib.globalStatus) {
								if (lib.globalStatus[j].type == i) {
									str +=
										'<P align=left><br><font size="3px">-->&thinsp;【' + lib.globalStatus[j].translation + "】：" + lib.globalStatus[j].intro + "</font></P>";
								}
							}
						}
						var more = ui.create.div(".globalStatusLib", '<div style="border:3px solid gray">' + str + "</div>");
						this.parentNode.insertBefore(more, this.nextSibling);
						this.globalStatusLib = more;
						this.innerHTML = '<div class="miao">全局状态一览<font size="4px">▼▼▼</font></div>';
					} else {
						this.parentNode.removeChild(this.globalStatusLib);
						delete this.globalStatusLib;
						this.innerHTML = '<div class="miao">全局状态一览<font size="4px">▶▶▶</font></div>';
					}
				}
			}
		},
		package: {
			character: {
				character: {},
				translate: {}
			},
			card: {
				card: {},
				translate: {},
				list: []
			},
			skill: {
				skill: {},
				translate: {}
			},
			intro: "",
			author: "喵喵",
			diskURL: "",
			forumURL: "",
			version: "23.10.11.11.31"
		},
		files: { "character": [], "card": [], "skill": [] }
	};
});
