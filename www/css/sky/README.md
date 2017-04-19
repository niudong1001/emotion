<pre>
//sky3.0

//关于本框架
1.本框架基于pure,并结合bootstrap与foundation,对pure进行了增强
2.本框架为纯css框架,使用normalize.css进行reset,若要自定义reset,请在less/base.less中定义
3.所有类样式基本设置在less/var.less中,这里可以自定义本框架的样式
4.本框架基本不使用关系选择符以便于您可以覆盖本框架默认样式
5.本框架基本不做任何除了normalize以外的reset

//主要修改点
1.去掉pure前缀
2.尽可能增强其浏览器兼容性
3.调整浏览器设备断点(640px,1025px,1601px)
4.改用less重写
5.增加常用类
6.重写部分类名，使其更符合语义
7.改写部分类
8.改写grid的子列类表示(保留5列与12列)

//使用说明
1.请直接在项目中引入<link href="*/sky.css" rel="stylesheet"/>;
2.本框架的响应式基于媒体检测,需要注意在ie9以下(不含ie9)并不支持media检测,这时候可以引用外部js以解决,如response.js
3.本框架除响应式无法被支持外,基本兼容ie7+;
4.具体类使用说明参照less/README.md

//作者
牛东/上海大学/8-23
</pre>