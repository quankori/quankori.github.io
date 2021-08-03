# Docker Quiz

- What is `docker system prune` ?

Command có thể xoá toàn bộ container, networks not used, images, cache. Nếu thêm lệnh `--volumes` có thể xoá toàn bo65F volumes not used

- Please know the mean of port ?

Format của HOST:CONTAINER

- Compare two options ports and expose in compose file ?

`expose` dùng để chỉ định port trong docker network, không thực hiện publish với host (chỉ dùng trong nội bộ docker, share giữa các container với nhau)

`ports` dùng để chỉ định port cho cả docker network và cả host

- Distinguish between docker stop and docker kill

Về cơ bản thì docker stop vàdocker kill đều được dùng để dừng một container đang chạy. Container đó sẽ không hiển thị khi thực thi docker ps nhưng sẽ xuất hiện khi thực thi docker ps -a (docker rm thì xóa hẳn và không hiển thị khi thực thi docker ps -a)

Điểm khác nhau nằm ở quá trình dừng container, với docker stop thì nó sẽ có 1 khoảng timeout (mặc định là 10s) trước khi chấm dứt hoạt động container, còn docker kill thì không.
