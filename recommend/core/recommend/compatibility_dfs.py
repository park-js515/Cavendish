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
            if hdd_com_case(parts[5], parts[7]):
                if power_com_case(parts[1], parts[7]):
                    return True
    return False

def cooler(parts):
    if case_com_cooler(parts[7], parts[8]):
        return True
    return False

lv_func = {
    0: cpu,
    1 : power,
    2 : mainboard,
    3 : ram,
    4 : gpu,
    5 : hdd,
    6 : ssd,
    7 : case,
    8 : cooler
}

def com_dfs(quotations, quotation, lv, parts_list, price_sum, budget):
    if lv == 0:
        quotations = []

    if price_sum > budget:
        return

    if lv == 9:
        quo = deepcopy(quotation)
        quotations.append(quo)
        return

    for idx, item in enumerate(parts_list[lv]):
        if len(quotations) >= 10:
            return quotations
        quotation[lv] = item
        if lv_func[lv](quotation) == True:
            com_dfs(quotations, quotation, lv+1, parts_list, price_sum + item.price, budget)
        quotation[lv] = 0

    if lv == 0:
        return quotations