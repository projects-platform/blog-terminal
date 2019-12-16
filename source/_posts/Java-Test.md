---
title: Go 语言的变量与常量
date: 2019-12-16 15:04:49
tags:
---

![](https://s2.ax1x.com/2019/10/29/KRNxoR.jpg)

### 变量声明，初始化与赋值

- 变量的声明格式：`var <变量名称> [变量类型]`；
- 变量的赋值格式：`<变量名称> = <值，表达式，函数等>`；
- 声明和赋值同时进行：`var <变量名称> [变量类型] = <值，表达式，函数等>`；
- 分组声明的格式

```go
package basic

import "fmt"

func DeclaratGroupVariable(){
	// 分组声明变量
	var (
		name string
		age int = 18
	)

	name = "hvkcoder"

	fmt.Printf("Hello！My name'is %d. I'm %d years old", name, age)
}
```

- 简写声明格式：`<变量名称> := <值，表达式，函数等>`，只能在局部变量声明时使用，并且必须赋值；
- 声明多个变量，需要以 `,` 隔开；

```go
package basic

import "fmt"

func DeclaratMultiVariable(){
	// 声明多个变量
	var a , b, c int
	// 为多个变量赋值
	a, b, c = 1 ,2, 3
	fmt.Printf("a = %d , b = %d , c = %d", a, b, c)

	// 声明多个变量并赋值
	var e, f, g int = 4, 5, 6
	fmt.Printf("e = %d , f = %d , g = %d", e, f, g)

	// 简写声明
	h, i, j := 7, 8, 9
	fmt.Printf("h = %d , i = %d , j = %d", h, i, j)
}
```

**声明全局变量时，不能使用简写声明，且必须使用 `var` 关键字。变量名是 下划线（`_`) 表示忽略。**

### 常量定义的形式，类型范围

- 常量定义从形式上可以分为 显式 和 隐式；

  - 显式：`const <常量名称> [type] = value`；
  - 隐式：`const <常量名称> = value`；

- 一般情况下常量名称需大写，若该常量为私有常量，只需在常量名前加 下滑线（`_`)，如：`const _PI = 3.14`；
- 常量可以使用内置表达式，如：`len()`，`unsafe.SizeOf()` 等；

```go
package basic

import "unsafe"


func DeclaratExpression(){
	const (
		_NAME string = "hvkcoder"
		_NAME_LENGTH int = len(_NAME)
		_NAME_SIZE  = unsafe.Sizeof(_NAME)
	)
}
```

- 多组常量声明时，常量默认取上一个常量的值；

```go
package basic

import "fmt"

func DeclaratGroupConstant(){
	const (
		_NAME string = "hvkcoder"
		_FIRST_NAME
	)

	fmt.Println(_NAME)
	fmt.Println(_FIRST_NAME)
}

```

**常量类型范围目前只支持 布尔型、数字型和字符串类型**。

### 特殊常量 iota

- `iota` 只能在常量的表达式中使用，在 `const` 关键字出现时， `iota`将被重置为 0；
- `const` 中每新增一行常量声明，将使 `iota` 计数一次；
- `iota` 常见用法：

  - 跳值使用法

  ```go
  package basic

  import "fmt"

  func JumpValueByIota(){
      const (
          a = 3.14
          b
          c = iota  // 2
          d         // 3
      )
      fmt.Println(a,b,c,d)
  }
  ```

  - 插值使用法

  ```go
  package basic

  import "fmt"

  func InsertValueByIota(){
  	const (
  		a = iota   // 0
  		b = 3.14
  		c = iota   // 2
  		d          // 3
  	)
  	fmt.Println(a,b,c,d)
  }
  ```

  - 表达式隐式使用法

  ```go
  package basic

  import "fmt"

  func ExpressionByIota(){
  	const (
  		B = 1 << (10 * iota)  // 1
  		KB                    // 1024
  		MB                    // 1048576
  		GB                    // 1073741824
  		TB                    // 1099511627776
  		PB                    // 1125899906842624
  	)

  	fmt.Println(B,KB,MB,GB,TB,PB)
  }
  ```

  - 单行使用法

  ```go
  package basic

  import "fmt"

  func SingleLineByIota(){
  	const (
  		a , b = iota + 1, iota + 2
  		c, d = iota + 3, iota + 4

  		// a => 0 + 1
  		// b => 0 + 2
  		// c => 1 + 3
  		// d => 1 + 4
  	)
  	fmt.Println(a,b,c,d)
  }
  ```

### 变量的类型转换

- Go 语言中不存在隐式转换，类型转换必须是显式的；
- 类型转换只能发生在两种兼容类型之间；
- 类型转换的格式：`var <变量名称> [:]= <目标类型>(<需要转换的变量>)`;
