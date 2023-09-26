

# 이진수를 십진수로 변환하는 함수 (문자열 반환)
def decimal_to_name(target, length, check_list):
    result = []
    for i in range(length):
        if target & (1 << i):
            result.append(check_list[i])
    
    return result