import requests

# data = {'bedroom': 5, 'area': 45, 'districtId': 'Quận Tây Hồ', 'wardId': 'Phường Bưởi', 'type': 'Nhà ngõ, hẻm'}
data = {'Địa chỉ': '4, Đường Kim Giang, Phường Đại Kim, Quận Hoàng Mai, Hà Nội'}
TEST_URL = 'https://pricing-290000.et.r.appspot.com/search'

r = requests.post(TEST_URL, json=data)

print(r)
