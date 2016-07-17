
```
	<svg xmlns="http://www.w3.org/2000/svg" style="display:none">
		<symbol id="checkbox_yes" viewBox="0 0 40 40">
			<g>
				<path d="..." class="cls-1"></path>
				<path d="..." class="cls-2"></path>
			</g>
		</symbol>
		<symbol id="circle_dots" viewBox="0 0 40 40">
			<g>
				<circle cx="20" cy="20" r="20" class="cls-1"></circle>
				<path d="..." class="cls-2"></path>
			</g>
		</symbol>
	</svg>

```
1.外部样式可以通过svg use里shadow DOM的标签名、类名、id选择器来选中这些节点并且改变其样式。

`#checkbox_yes`

`.cls-1`

`path`

`circle.cls-1`

1.2 不可以dom与shadow dom选择器级连使用，以下为错例：

`use .cls-1`

`use symbol`

1.3svg标签做选择器时则比较奇怪，但其实也是符合以上规律。

成功选择：

`svg path`

`svg .cls-1`

`svg path.cls-1`

失败选择：

`svg.status .cls-1`
`.step svg path`

按照上述例子分析，直接用svg标签选择器，会寻找shadow dom里的svg元素，因为加了.status类名修饰后选择不成功，证明选择的是shadow dom里的svg元素。

而且在svg标签选择器前后加dom里的id、class、标签名，一种是理解成会选择到dom里的svg元素，根据1.2，是选择失败的、或者另一种理解，也是选择shadow dom里的svg元素，但是该规则不匹配任何元素，所以失败。也有可能是dom、shadow dom各找一次，说不准。

2."相同分数"的选择器，内部样式表定义的样式强于外部样式表。分数不同，则以高的为准。

3.shadow dom里即使use标签里在chrome上看到的是svg标签代替了symbol标签，但是选择器仍然以symbol标签来选择。

4.无论是内部还是外部样式表定义的样式，其后代标签继承所得的样式都是最弱的，可以被内部及外部样式表和内联样式所覆盖。

```
外部：					内部：					
g {						path {
	fill:green;				fill:red;	
}						}						结果：red


外部：					内部：					
path {						g {
	fill:green;				fill:red;	
}						}						结果：green

```