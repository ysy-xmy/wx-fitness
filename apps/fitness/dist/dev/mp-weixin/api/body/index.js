"use strict";const d=require("../../utils/request.js"),a=t=>d.http.post("/api/body/getByType",t),e=t=>d.http.post("/api/body/add",t);exports.addBodydata=e;exports.getBodydata=a;
