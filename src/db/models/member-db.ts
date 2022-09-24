import { MemberDataSource } from "../sources/data-source";
import { Member } from "../entity/member";
import sha256 from "../../controller/inout-modules/sha256";

const memberModel = {
  async create(grade: number, name: string, hashedpin: string) {
    const member = new Member();
    member.grade = grade;
    member.name = name;
    member.pin = sha256(hashedpin);
    await MemberDataSource.getRepository(Member).save(member);
  },

  async read(name: string) {
    const member = await MemberDataSource.getRepository(Member)
      .createQueryBuilder("Member")
      .where("Member.name = :name", { name })
      .getOne();
    return member;
  },
};

export default memberModel;
