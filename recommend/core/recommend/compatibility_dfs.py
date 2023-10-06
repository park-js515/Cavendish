from ..case import case_com_cooler, case_com_mainboard  
from ..gpu import gpu_com_cpu, gpu_com_case, gpu_com_power, gpu_com_mainboard
from .. hdd import hdd_com_case, hdd_com_mainboard
from ..mainboard import mainboard_com_cpu
from ..power import power_com_case, power_com_ssd
from ..ram import ram_com_cpu, ram_com_mainboard
from ..ssd import ssd_com_cpu, ssd_com_mainboard
from copy import deepcopy


def cpu(parts):
    return True


def power(parts):
    return True


def mainboard(parts):
    if mainboard_com_cpu(parts[2], parts[0]):
        return True
    return False


def ram(parts):
    if ram_com_cpu(parts[3], parts[0]):
        if ram_com_mainboard(parts[3], parts[2]):
            return True
    return False


def gpu(parts):
    if gpu_com_cpu(parts[4], parts[0]):
        if gpu_com_mainboard(parts[4], parts[2]):
            if gpu_com_power(parts[4], parts[1]):
                return True
    return False


def hdd(parts):
    if parts[5] is None:
        return True
    if hdd_com_mainboard(parts[5], parts[2]):
        return True
    return False


def ssd(parts):
    if ssd_com_cpu(parts[6], parts[0]):
        if ssd_com_mainboard(parts[6], parts[2]):
            if power_com_ssd(parts[1], parts[6]):
                return True
    return False


def case(parts):
    if case_com_mainboard(parts[7], parts[2]):
        if gpu_com_case(parts[4], parts[7]):
            if power_com_case(parts[1], parts[7]):
                if parts[5] is None:
                    return True
                elif hdd_com_case(parts[5], parts[7]):
                    return True
    return False


def cooler(parts):
    if case_com_cooler(parts[7], parts[8]):
        return True
    return False


lv_func = {
    0: cpu,
    1: power,
    2: mainboard,
    3: ram,
    4: gpu,
    5: hdd,
    6: ssd,
    7: case,
    8: cooler
}


def com_dfs(quotation, lv, parts_list, price_sum, budget, spi):
    if price_sum > budget:
        return

    if lv == 9:
        return deepcopy(quotation)

    count = 0
    while True:
        item = parts_list[lv][spi[lv] % len(parts_list[lv])]
        quotation[lv] = item
        if lv_func[lv](quotation):
            # print(lv)
            if item is None:
                spi[lv] += 1
                return com_dfs(quotation, lv+1, parts_list, price_sum, budget, spi)
            elif item.price is not None:
                spi[lv] += 1
                return com_dfs(quotation, lv+1, parts_list, price_sum + item.price, budget, spi)
        if count >= max(len(parts_list[lv]), 400):
            break
        spi[lv] += 1
        count += 1
        # if lv == 2:
            # print(count, spi[lv])