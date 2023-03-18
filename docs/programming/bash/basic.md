---
title: Basic
---

## Execute

```bash
chmod +x demo.sh
```

## Variable

```bash
#!/bin/bash

# Gán biến
MESSAGE="Hello, World"

# Đọc biến
echo "message: $MESSAGE"

# Thời gian bắt đầu
START=$(date +%s)

# Vị trí thư mục
DIRECTORY=$(pwd)

# Deley 2 giây
sleep 2

# Thời gian sau 2 giây
END=$(date +%s)

# Khoảng thời gian
DIFFERENCE=$((END - START))
```

## Input

```bash
#!/bin/bash

# -n: Chờ nhập
echo -n Your name:
read NAME

# -p: Gộp chung với read đọc tên biến
read -p "Your name: " NAME

# -sp: Đọc tên biến nhưng không hiện ra
read -sp "Your name: " NAME

# Đọc hostname
read HOSTNAME < /etc/hostname
```

## Math

```bash
#!/bin/bash
NUMBER=5

# Xài let: số nguyên
let RESULT=NUMBER+5

# Xài (( )): số nguyên
RESULT=$((NUMBER + 5))

# Xài [ ]: số nguyên
RESULT=$[NUMBER + 5]

# Expr: số nguyên
RESULT=$(expr $NUMBER + 5)

# bc: số nguyên và số thập phân
RESULT=`echo "$NUMBER * 1.9" | bc`
```

## Arguments

```bash
#!/bin/bash

# Truyền biến 0: default, 1: biến thứ nhất
echo "$0"
echo "$1"

# Lấy hết biến truyền vào
echo "\$@: $@"

# Tính tổng biến truyền vào
echo "Count: $#"
```

## Piping

```bash
#!/bin/bash

# Kiểm tra file
cat new_file

# Truyền biến vào
# > ghi đè từ điểm bắt đầu
# >> ghi thêm từ điểm kết thúc
# < lấy ra trong file
# 2> Lấy data lỗi ra file riêng
# | lệnh đầu vào và đầu ra
echo "Hello" > new_file
echo "Hello 2" >> new_file
wc < name_file
ls new.sh 2> error_msg
cat file_1.txt | head -5
```

## Conditional

```bash
#!/bin/bash
# Câu mặc định
if [ condition ];
then
    commands;
else
    commands;
fi

# Integer
# -eq => Bằng nhau (Equal)
# -ne => Không bằng nhau (Not equal)
# -lt => Nhỏ hơn (Less than)
# -gt => Lớn hơn (Greater than)
# -le => Nhỏ hơn hoặc bằng (Less or equal)
# -ge => Lớn hơn hoặc bằng (Greater or equal)
var=10
if [ $var -eq 0 ]; # False
then
    commands;
fi

# String
# [[ $str1 = $str2 ]] hoặc [[ $str1 == $str2 ]]: Giống nhau
# [[ $str1 != $str2 ]]: Khác nhau
# [[ $str1 > $str2 ]]: Trả về TRUE nếu srt1 lớn hơn str2 tính theo bảng chữ cái
# [[ $str1 < $str2 ]]: Trả về TRUE nếu srt1 nhỏ hơn str2 tính theo bảng chữ cái
# [[ -z $str1 ]]: Trả về TRUE nếu $str1 là 1 chuỗi rỗng.
# [[ -n $str1 ]]: Trả về TRUE nếu $str1 là 1 chuỗi khác rỗng.
str1="HELLO"
str2="Hello"
if [[ $str1 > $str2 ]]; # True
then
    commands;
fi

# File
# [ -f $file_var]: Trả về TRUE nếu file_var là 1 tập tin.
# [ -x $var ]: Trả về TRUE nếu var là tập tin và có quyền thực thi (executable)
# [ -d $var ]: Trả về TRUE nếu var là 1 thư mục
# [ -e $var ]: Trả về TRUE nếu var tồn tại
# [ -w $var ]: Trả về TRUE nếu var là 1 tập tin và có quyền ghi (writable)
# [ -r $var ]: Trả về TRUE nếu var là 1 tập tin và có quyền đọc (readable)
# [ -L $var ]: Trả về TRUE nếu var là 1 liên kết mềm (symlink)
fpath="/etc/passwd"
if [ -e $fpath ]; then
    echo File exists;
else
    echo Does not exist;
fi

# AND hoặc && => Trả về TRUE khi tất cả các điều kiện đều thỏa
# OR hoặc || => Trả về TRUE khi 1 trong các điều kiện thỏa
str1="Not empty "
if [[ -n $str1 ]] || [[ -z $str1 ]];
then
    echo TRUE
fi
```

## Wildcard

```bash
#!/bin/bash

ls [sv]*
# secondfile video.mpeg

ls [^a-k]*
# secondfile thirdfile video.mpeg

ls *[0-9]*
# foo1 foo2 foo3

# *: match bất kì
# ?: match 1 ký tự bất kì
# ^: khoảng cách
# [characters]: match ký tự nào có trong set
# [!characters]: không match ký tự nào có trong set
# [[:class:]]: match ký tự định nghĩa bởi class
```

## Loop

```bash
#!/bin/bash

# For
for var in 0 1 2 3 4 5 6 7 8 9
do
   echo $var
done

# While
a=0
while [ $a -lt 10 ]
do
   echo $a
   a=`expr $a + 1`
done

# Until
a=0
until [ ! $a -lt 10 ]
do
   echo $a
   a=`expr $a + 1`
done
```

## Case

```bash
#!/bin/bash

FRUIT="kiwi"

case "$FRUIT" in
   "apple") echo "Apple pie is quite tasty."
   ;;
   "banana") echo "I like banana nut bread."
   ;;
   "kiwi") echo "New Zealand is famous for kiwi."
   ;;
esac

# Case truyền biến
case  in
   -f) FILE="2"
      echo "File name is $FILE"
      ;;
   -d) DIR="2"
      echo "Dir name is $DIR"
      ;;
   *)
      echo "`basename 0`:usage: [-f file] | [-d directory]"
      exit 1 # Command to come out of the program with status 1
      ;;
esac

# $./test.sh
# test.sh: usage: [ -f filename ] | [ -d directory ]
# $ ./test.sh -f index.jsp
# $ vi test.sh
# $ ./test.sh -f index.jsp
# File name is index.jsp
# $ ./test.sh -d unix
# Dir name is unix
```

## Array

```bash
#!/bin/sh

NAME[0]="Zara"
NAME[1]="Qadir"
NAME[2]="Mahnaz"
NAME[3]="Ayan"
NAME[4]="Daisy"

echo ${NAME[0]} # Lấy giá trị mảng tại vị trí truyền vào
echo "First Method:${NAME[*]}"
echo "Second Method:${NAME[@]}"
echo ${#NAME[*]} # Chiều dài mảng
```

## Functions

```bash
#!/bin/bash

# Filename: function.sh

function add()
{
    num1=$1    #--> Lấy giá trị của đối số thứ 1
    num2=$2    #--> Lấy giá trị của đối số thứ 2
    sum=`expr $num1 + $num2` #--> Tính tổng 2 số

    # In ra kết quả
    echo "First number is: " $num1
    echo "Second number is: " $num2
    echo "$1 + $2 = " $sum
}
# $ add 100 200
# First number is: 100
# Second number is: 200
# 100 + 200 = 300

function factorial()
{
    if [ $1 -eq 0 ]
    then
    {
        echo 1
    }
    else
    {
        echo $(($1 * $(factorial $(($1-1))))) -> Gọi lại hàm factional ở trên
    }
    fi
}
```
