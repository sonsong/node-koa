/** 
    mock的语法规范：
        1、数据模板定义规范（Data Template Definition，DTD）
            //属性名 name ： 生成数据的key值
            //生成规则（可选） rule  
                    1、'name|min-max': value
                    //数字类型没有这个规则
                    2、'name|count': value
                    3、'name|min-max.dmin-dmax': value
                    4、'name|+step': value
                    5、'name|min-max.dcount': value
                    6、'name|count.dmin-dmax': value
                    7、'name|count.dcount': value
                
            //属性值 value
                1、可以有占位符@
                2、指定了最终值和初始值和类型
            'name|rule': value
        2、数据占位符定义规范（Data Placeholder Definition，DPD）
*/

const Mock = require('mockjs');

//String:

    //'name|min-max': string
    //重复str 1~10次
    /* rule = {
        'name|1-10': 'str'
    } */

    //'name|count': string
    //重复5次str，组成字符串输出 { name: 'strstrstrstrstr' }
    /* rule = {
        'name|5': 'str'
    } */
//Number：
    //'name|min-max': number
    //生成一个在1~10之间的数，2只是用来确定类型
    /* rule = {
        'num|1-10': 2
    } */

    //'name|+1': number
    //自增1， 作为子规则出现
    /* rule = {
        "number|+1": 814
    } */

    //name|min-max.dmin-dmax': number
    //生成一个1~10之间的浮点数，
    //整数部分大于等于 min、小于等于 max，
    //小数部分保留2位。
    /* rule = {
        'num|1-10.2-2': 1
    } */

    //'name|min-max.dcount': value
    //正式部分在1~5之间
    //小数部分保留5位小数
    /* rule = {
        'num|1-5.5': 1
    } */

    //'name|count.dmin-dmax': value
    //整数为4， 小数保留1~2位
    /* rule = {
        'num|4.1-2': 1
    } */

    //'name|count.dcount': value 
    //整数为4， 小数保留1位 
    //如果是字符串，重复1四次，小数部分规则忽略
    rule = {
        'num|4.1': "1"
    } 

//Boolean:
    //'name|1': boolean
    //生成true or false 的概率各占一半
    /* rule = {
        'bool|1': true
    } */
    //'name|min-max': value
    //随机生成一个布尔值，
    //值为 value 的概率是 min / (min + max)
    //值为 !value 的概率是 max / (min + max)
    /* rule = {
        'bool|1-3': true
    } */

//Object:
    //'name|min-max': object
    //从object属性中随机选取0~3个数据
    /* rule = {
        'obj|0-3': {
            'aa': 1,
            'bb': 2,
            'cc': 3
        }
    } */

    //'name|count': object
    //从object属性中随机选取2个数据
    /* rule = {
        'obj|2': {
            'aa': 1,
            'bb': 2,
            'cc': 3
        }
    } */

//Array
    //'name|1': Array
    //从数组中随机抽取一个数字
    /* rule = {
        'arr|1': [{'id': 1}, 2, 3]
    } */

    //'name|+1': array 永远取得是第一个直接输出
    //从属性值 array 中顺序选取 1 个元素，作为最终值。
    /* rule = {
        'arr|+1': [1, 2, 3]
    } */


    //'name|min-max': array
    //通过重复属性值 array 生成一个新数组，
    //重复次数大于等于 min，小于等于 max。
    /* rule = {
        'arr|1-5': [1, 2]
    } */


    //'name|count': array
    //通过重复属性值 array 生成一个新数组，重复次数为 count
    /*rule = {
        'arr|5': [1, 2]
    } */

    //模拟数组数据 长度最大为10 从1开始自增
    /* let rule = {
        'list|1-10': [{
            'id|32': '1'
        }]
    } */

//Function:
    function testFunc(){
        return 'hahahah';
    }
    //'name': function
    //执行函数 function，
    //取其返回值作为最终的属性值，函数的上下文为属性 'name' 所在的对象。
    //{ func: 'hahahah' }
    /* rule = {
        'func': testFunc
    } */

//RegExp
    // 反向生成可以匹配它的字符串
    /* rule = {
        'regexp1': /[a-z][A-Z][0-9]/,
        'regexp2': /\w\W\s\S\d\D/,
        'regexp3': /\d{5,10}/
    } */


let data = Mock.mock(rule);

console.log(data); 

