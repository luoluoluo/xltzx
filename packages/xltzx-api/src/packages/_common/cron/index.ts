import { CronJob } from "cron";
import { cronCompleteCommission } from "./actions/commission";
import { cronCancalOrder, cronCompleteOrder } from "./actions/order";

// 每分钟执行一条取消未支付订单
new CronJob("0 * * * * *", cronCancalOrder).start();

// 每分钟执行一条完成订单
new CronJob("0 * * * * *", cronCompleteOrder).start();

// 每分钟执行一条完成分佣
new CronJob("0 * * * * *", cronCompleteCommission).start();
