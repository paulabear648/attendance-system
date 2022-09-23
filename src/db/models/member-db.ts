import { MemberDataSource } from "../sources/data-source";
import { Member } from "../entity/member";

const memberModel = {
  async create(grade: number, name: string, pin: string) {
    const member = new Member();
    member.grade = grade;
    member.name = name;
    member.pin = pin;
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
