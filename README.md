# 注意

`plainToInstance`接受的参数是`object`，也就是说没有被`await`的`Promise`也可以接受！所以一定要确认传递给`plainToInstance`的对象是`await`过的。