<pre>
//欢迎使用本框架

1.button

.btn
.btn-hover
.btn-active
.btn-disabled
.btn-hidden

.btn-primary
.btn-success
.btn-error
.btn-warning
.btn-secondary

.btn-xsmall
.btn-small
.btn-large
.btn-xlarge

.btn-radius
.btn-round
.btn-block

//变量(可自定义)

@sky-btn-bg:#e6e6e6;
@sky-btn-color:#444;
@sky-btn-border-color:#999;
@sky-btn-radius:3px;
@sky-btn-round:27px;
//padding
@sky-btn-paddingTB:1em;
@sky-btn-paddingLR:2em;
//enhance-color
@sky-btn-enhance-color:white;
//默认按钮选择
@sky-btn-default:1;//1(no radius);2(small radius);3(large radius);4(block btn)

2.grid

.row
.col
.col-1
//无响应式
//col
	.col-1-5 -> .col-4-5
	.col-1-12 -> .col-11-12
//offset
	.offset-1-5 -> .offset-4-5
	.offset-1-12 -> .offset-11-12
//响应式(*可为sm,md,lg)
//col
	.col-*-1-5 -> .col-*-4-5
	.col-*-1-12 -> .col-*-11-12
//offset
	.offset-*-1-5 -> .offset-*-4-5
	.offset-*-1-12 -> .offset-*-11-12
//帮助类
	hidden-mobile
	hidden-sm
	hidden-md
	hidden-lg

//变量
	@sky-grid-font-family:@sky-font-family;
	@sky-grid-col-paddingLR:15px;

3.table
//若要覆盖table定义,可使用.table .className选择符,单独为某个单元格加类无法覆盖
.table
.table-striped-row(ie9以下)
.table-striped
.table-bordered
.table-horizontal

//变量
@sky-table-border-color:#cbcbcb;
@sky-table-caption-color:#000;
@sky-table-caption-font-family:@sky-font-family;
@sky-table-cell-paddingTB:0.5em;
@sky-table-cell-paddingLR:1em;
@sky-table-thead-color:#000;
@sky-table-thead-bg-color:#e0e0e0;
@sky-table-striped-bg-color:#f2f2f2;

4.menu
.menu
.menu-fixed-top
.menu-ul
.menu-vertical
.menu-hover
.menu-padding
.menu-paddingLR
.menu-paddingTB
.menu-dropdown-li-bottom
//dropdown使用方式
<textarea>
	<ul class="menu menu-ul menu-hover menu-padding">
		<li class="menu-dropdown-li-bottom"><a href="tt" class="btn">下拉菜单</a>
			<ul>
				<li><a href="#">c#</a></li>
				<li><a href="#">java</a></li>
			</ul>
		</li>
		<li><a href="ss">这是测试</a></li>
	</ul>
</textarea>

//覆盖
覆盖本menu子元素样式只需要.menu .className即可

5.form
.form//基本样式
.form-stacked//堆叠样式
.form-aligned//对齐样式
</pre>