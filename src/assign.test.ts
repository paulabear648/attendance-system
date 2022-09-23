import { MemberDataSource } from "./db/sources/data-source";
import {registerMember} from "./db/init/init-members";
import certificator from "./controller/records/modules/certification";
import express from "express";

type TestType = {
    name:string;
    pin:string;
}

const testArray:Array<TestType> =[
    {name:"test1",pin:"0000"},
    {name:"A",pin:"0001"},
    {name:"TEST3",pin:"0002"},
    {name:"samepin1",pin:"0003"},
    {name:"samepin2",pin:"0003"}
];

const app = express();
app.use(express.static("./dist/public"));


describe("#1 nameとpinが真",()=>{

        MemberDataSource.initialize().then(async()=>
            testArray.forEach(async (value,index,array)=>{
                console.log("adding element");
                await registerMember(value.name,value.pin)
            })
        ).catch((error) => console.log(error));

    testArray.forEach((value,index,array)=>{
        test("test:" + index,async ()=>{
            expect(await certificator.certificate(value.name,value.pin)).toBe({ cert: true, message: "" });
        });
    })
});