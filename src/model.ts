import { AppDataSource } from "./data-source";
import { Record } from "./entity/Record";

const TIMEDIGIT = 2;

const model = {
  getRecords() {
    return AppDataSource.getRepository(Record).find({
      order: {
        id: "DESC",
      },
    });
  },

  stringifyTime(time: Date) {
    const dayOfWeek = time.getDay(); //getDayメソッドは数字を返すため、
    const dayOfWeekStr = ["日", "月", "火", "水", "木", "金", "土"][dayOfWeek]; // ここで曜日を日本語表記に変換する

    // Date()で表示される時間は見づらかったため、見やすく表示。この部分は、関数化し、Modelにやらせたほうが良いかも
    const timeStr =
      time.getFullYear().toString() +
      "年" +
      padStartWith0((time.getMonth() + 1).toString()) +
      "月" +
      padStartWith0(time.getDate().toString()) +
      "日（" +
      dayOfWeekStr +
      "）" +
      padStartWith0(time.getHours().toString()) +
      "：" +
      padStartWith0(time.getMinutes().toString()) +
      "：" +
      padStartWith0(time.getSeconds().toString());

    return timeStr;
  },
};

function padStartWith0(time: string) {
  return time.padStart(TIMEDIGIT, "0");
}

export default model;
