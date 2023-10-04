from .quotation import *

def serialize_cpu_output(cpu_object):
    cpu_dict = CPUOutput(
        id=cpu_object.id,
        name=cpu_object.name,
        price=cpu_object.price,
        link=cpu_object.link,
        company=cpu_object.company,
        product_seq=cpu_object.product_seq,
        image=cpu_object.image,
        code=cpu_object.code,
        socket=cpu_object.socket,
        core_number=cpu_object.core_number,
        thread_number=cpu_object.thread_number,
        l2_cache=cpu_object.l2_cache,
        l3_cache=cpu_object.l3_cache,
        tdp=cpu_object.tdp,
        pbpmtp=cpu_object.pbpmtp,
        has_graphic=cpu_object.has_graphic,
        graphic_name=cpu_object.graphic_name,
        graphic_core_speed=cpu_object.graphic_core_speed,
        memory_capacity=cpu_object.memory_capacity,
        memory_type=cpu_object.memory_type,
        memory_clock=cpu_object.memory_clock,
        memory_channel=cpu_object.memory_channel,
        pcie_version=cpu_object.pcie_version,
        pcie_channel_number=cpu_object.pcie_channel_number,
        has_cooler=cpu_object.has_cooler,
        clock_basic=cpu_object.clock_basic,
        clock_max=cpu_object.clock_max,
        nm=cpu_object.nm,
        tech_support=cpu_object.tech_support,
        bench_mark=cpu_object.bench_mark,
        reg_date=cpu_object.reg_date,
        bookmark=cpu_object.bookmark,
    ).__dict__
    return cpu_dict

def serialize_ram_output(ram_object):
    ram_dict = RAMOutput(
        id=ram_object.id,
        name=ram_object.name,
        price=ram_object.price,
        link=ram_object.link,
        company=ram_object.company,
        product_seq=ram_object.product_seq,
        image=ram_object.image,
        generation=ram_object.generation,
        capacity=ram_object.capacity,
        clock=ram_object.clock,
        timing=ram_object.timing,
        number=ram_object.number,
        ecc=ram_object.ecc,
        xmp=ram_object.xmp,
        expo=ram_object.expo,
        heatsink=ram_object.heatsink,
        heatsink_color=ram_object.heatsink_color,
        led=ram_object.led,
        led_color=ram_object.led_color,
        reg_date=ram_object.reg_date,
        bookmark=ram_object.bookmark,
    ).__dict__
    return ram_dict

def serialize_mainboard_output(mainboard_object):
    mainboard_dict = MainboardOutput(
        id=mainboard_object.id,
        name=mainboard_object.name,
        price=mainboard_object.price,
        link=mainboard_object.link,
        company=mainboard_object.company,
        product_seq=mainboard_object.product_seq,
        image=mainboard_object.image,
        cpu_socket=mainboard_object.cpu_socket,
        chipset=mainboard_object.chipset,
        form_factor=mainboard_object.form_factor,
        memory_type=mainboard_object.memory_type,
        memory_number=mainboard_object.memory_number,
        memory_capacity=mainboard_object.memory_capacity,
        xmp=mainboard_object.xmp,
        expo=mainboard_object.expo,
        sata3_number=mainboard_object.sata3_number,
        m2_number=mainboard_object.m2_number,
        m2_interface=mainboard_object.m2_interface,
        m2_formfactor=mainboard_object.m2_formfactor,
        pcie_version=mainboard_object.pcie_version,
        vga_connection=mainboard_object.vga_connection,
        wireless_lan=mainboard_object.wireless_lan,
        wired_lan_speed=mainboard_object.wired_lan_speed,
        phase=mainboard_object.phase,
        graphic_output=mainboard_object.graphic_output,
        back_panel=mainboard_object.back_panel,
        io_header=mainboard_object.io_header,
        feature=mainboard_object.feature,
        reg_date=mainboard_object.reg_date,
        bookmark=mainboard_object.bookmark,
        mainboard_pci=[],
    ).__dict__
    return mainboard_dict

def serialize_gpu_output(gpu_object):
    gpu_dict = GPUOutput(
        id=gpu_object.id,
        name=gpu_object.name,
        price=gpu_object.price,
        link=gpu_object.link,
        company=gpu_object.company,
        product_seq=gpu_object.product_seq,
        image=gpu_object.image,
        chipset_company=gpu_object.chipset_company,
        chipset=gpu_object.chipset,
        nm=gpu_object.nm,
        base_clock=gpu_object.base_clock,
        boost_clock=gpu_object.boost_clock,
        cuda_processor=gpu_object.cuda_processor,
        stream_processor=gpu_object.stream_processor,
        interface=gpu_object.interface,
        memory_type=gpu_object.memory_type,
        memory_capacity=gpu_object.memory_capacity,
        memory_clock=gpu_object.memory_clock,
        memory_bus=gpu_object.memory_bus,
        port=gpu_object.port,
        monitor_support=gpu_object.monitor_support,
        additional_function=gpu_object.additional_function,
        usage_power=gpu_object.usage_power,
        recommend_power=gpu_object.recommend_power,
        cooling_type=gpu_object.cooling_type,
        pan_number=gpu_object.pan_number,
        length=gpu_object.length,
        thickness=gpu_object.thickness,
        pin=gpu_object.pin,
        feature=gpu_object.feature,
        as_years=gpu_object.as_years,
        bench_mark=gpu_object.bench_mark,
        reg_date=gpu_object.reg_date,
        bookmark=gpu_object.bookmark,
    ).__dict__
    return gpu_dict


def serialize_ssd_output(ssd_object):
    ssd_dict = SSDOutput(
        id=ssd_object.id,
        name=ssd_object.name,
        price=ssd_object.price,
        link=ssd_object.link,
        company=ssd_object.company,
        product_seq=ssd_object.product_seq,
        image=ssd_object.image,
        form_factor=ssd_object.form_factor,
        interface=ssd_object.interface,
        protocol=ssd_object.protocol,
        volume=ssd_object.volume,
        memory_type=ssd_object.memory_type,
        nand=ssd_object.nand,
        ram_mounted=ssd_object.ram_mounted,
        ram_type=ssd_object.ram_type,
        sequential_read=ssd_object.sequential_read,
        sequential_write=ssd_object.sequential_write,
        read_iops=ssd_object.read_iops,
        write_iops=ssd_object.write_iops,
        heatsink=ssd_object.heatsink,
        rgbled=ssd_object.rgbled,
        as_year=ssd_object.as_year,
        reg_date=ssd_object.reg_date,
        bookmark=ssd_object.bookmark,
        support_option=ssd_object.support_option,
    ).__dict__
    return ssd_dict

def serialize_hdd_output(hdd_object):
    hdd_dict = HDDOutput(
        id=hdd_object.id,
        name=hdd_object.name,
        price=hdd_object.price,
        link=hdd_object.link,
        company=hdd_object.company,
        product_seq=hdd_object.product_seq,
        image=hdd_object.image,
        size=hdd_object.size,
        capacity=hdd_object.capacity,
        interface=hdd_object.interface,
        rpm=hdd_object.rpm,
        transfer_rate=hdd_object.transfer_rate,
        buffer_capacity=hdd_object.buffer_capacity,
        recording_method=hdd_object.recording_method,
        thickness=hdd_object.thickness,
        as_year=hdd_object.as_year,
        reg_date=hdd_object.reg_date,
        bookmark=hdd_object.bookmark,
    ).__dict__
    return hdd_dict

def serialize_case_output(case_object):
    case_dict = CaseOutput(
        id=case_object.id,
        name=case_object.name,
        price=case_object.price,
        link=case_object.link,
        company=case_object.company,
        product_seq=case_object.product_seq,
        image=case_object.image,
        category=case_object.category,
        size=case_object.size,
        power_included=case_object.power_included,
        power_support=case_object.power_support,
        board_support=case_object.board_support,
        bay_133=case_object.bay_133,
        bay_89=case_object.bay_89,
        bay_64=case_object.bay_64,
        pci_horizontal=case_object.pci_horizontal,
        pci_vertical=case_object.pci_vertical,
        cooling_fan=case_object.cooling_fan,
        led_fan=case_object.led_fan,
        front_type=case_object.front_type,
        side_open=case_object.side_open,
        side_type=case_object.side_type,
        back_vent=case_object.back_vent,
        front_vent=case_object.front_vent,
        top_vent=case_object.top_vent,
        bottom_vent=case_object.bottom_vent,
        external_port=case_object.external_port,
        width=case_object.width,
        height=case_object.height,
        depth=case_object.depth,
        gpu_size=case_object.gpu_size,
        cpu_cooler_size=case_object.cpu_cooler_size,
        power_size=case_object.power_size,
        liquid_cooler=case_object.liquid_cooler,
        radiator_top=case_object.radiator_top,
        radiator_front=case_object.radiator_front,
        radiator_rear=case_object.radiator_rear,
        radiator_side=case_object.radiator_side,
        feature=case_object.feature,
        led_color=case_object.led_color,
        reg_date=case_object.reg_date,
        bookmark=case_object.bookmark,
    ).__dict__
    return case_dict

def serialize_power_output(power_object):
    power_dict = PowerOutput(
        id=power_object.id,
        name=power_object.name,
        price=power_object.price,
        link=power_object.link,
        company=power_object.company,
        product_seq=power_object.product_seq,
        image=power_object.image,
        category=power_object.category,
        rated_power=power_object.rated_power,
        _80plus_certification=power_object._80plus_certification,
        eta_certification=power_object.eta_certification,
        lambda_certification=power_object.lambda_certification,
        voltage_fluctuation=power_object.voltage_fluctuation,
        output_method=power_object.output_method,
        availability=power_object.availability,
        pfc_circuit=power_object.pfc_circuit,
        pf_factor=power_object.pf_factor,
        fan_size=power_object.fan_size,
        fan_number=power_object.fan_number,
        bearing=power_object.bearing,
        output_12v=power_object.output_12v,
        cable_connection=power_object.cable_connection,
        depth=power_object.depth,
        main_power=power_object.main_power,
        sub_power=power_object.sub_power,
        pcie_16pin=power_object.pcie_16pin,
        pcie_8pin=power_object.pcie_8pin,
        pcie_6pin=power_object.pcie_6pin,
        sata=power_object.sata,
        ide_4=power_object.ide_4,
        rgb_connector=power_object.rgb_connector,
        feature=power_object.feature,
        inside=power_object.inside,
        protection=power_object.protection,
        as_years=power_object.as_years,
        reg_date=power_object.reg_date,
        bookmark=power_object.bookmark,
    ).__dict__
    return power_dict

def serialize_cooler_output(cooler_object):
    cooler_dict = CoolerOutput(
        id=cooler_object.id,
        name=cooler_object.name,
        price=cooler_object.price,
        link=cooler_object.link,
        company=cooler_object.company,
        product_seq=cooler_object.product_seq,
        image=cooler_object.image,
        category=cooler_object.category,
        cooling_type=cooler_object.cooling_type,
        aircool_form=cooler_object.aircool_form,
        tdp=cooler_object.tdp,
        intel_socket=cooler_object.intel_socket,
        amd_socket=cooler_object.amd_socket,
        fan_size=cooler_object.fan_size,
        fan_count=cooler_object.fan_count,
        airflow=cooler_object.airflow,
        noise=cooler_object.noise,
        width=cooler_object.width,
        length=cooler_object.length,
        height=cooler_object.height,
        radiator=cooler_object.radiator,
        radiator_length=cooler_object.radiator_length,
        radiator_thickness=cooler_object.radiator_thickness,
        hose_length=cooler_object.hose_length,
        feature=cooler_object.feature,
        as_years=cooler_object.as_years,
        reg_date=cooler_object.reg_date,
        bookmark=cooler_object.bookmark,
    ).__dict__
    return cooler_dict

def serialize_quotation_output(quotation):
    quotation_dict = QuotationOutput(
        cpu=serialize_cpu_output(quotation[0]),
        power=serialize_power_output(quotation[1]),
        mainboard=serialize_mainboard_output(quotation[2]),
        ram=serialize_ram_output(quotation[3]),
        gpu=serialize_gpu_output(quotation[4]),
        hdd=serialize_hdd_output(quotation[5]),
        ssd=serialize_ssd_output(quotation[6]),
        case=serialize_case_output(quotation[7]),
        cooler=serialize_cooler_output(quotation[8]),
    ).__dict__
    print(serialize_cpu_output(quotation[0]))
    return quotation_dict



