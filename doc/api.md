#  2016 GAP Summer Campaign 參數表

## 1.上傳user抽獎資料

### 上傳個人資料
![img](p1.jpg)

### Method
> `POST` api/sumbit.php

### Paramaters

 Param | Type   | Description |Option
:-----:|:------:|:-----------:|:-----:
`name`	|string| 	姓名 	 |M
`phone`	|string| 	手機號碼  |M
`email`	|string| 	email    |M

  
 `M - Mandatory, O - Optional`

### Response

> `err`: ** 有錯誤訊息才有這參數，不然為null **
>


```
{
	err:null
}
```

