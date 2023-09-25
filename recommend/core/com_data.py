cpu_com = {
    # ram 호환
    'memory_type' : {
        0 : 'DDR5',
        1 : 'DDR4',
        2 : 'DDR3L',
        3 : 'DDR3',
        4 : 'DDR2'
    },
    # 메인 보드, ssd, hdd 호환
    'pcie_version' : {
        0 : 'PCIe5.0',
        1 : 'PCIe4.0',
        2 : 'PCIe3.0'
    }
}

mainboard_com = {
    # ssd 호환
    'm2_interface' : {
        0 : 'SATA',
        1 : 'NVMe',
        2 : 'PCIe',
        3 : 'PCIe4.0',
        4 : 'PCIe5.0'
    },
    # ssd 호환
    'm2_formfactor' : {
        0 : '2230',
        1 : '2242',
        2 : '2260',
        3 : '2280',
        4 : '2580',
        5 : '22110',
        6 : '25110'
    },
    
    'wireless_lan' : {
        0 : '무선 LAN',
        1 : '블루투스',
        2 : 'M.2 Key-E(모듈별매)'
    },
    'graphic_output' : {
        0 : 'Type-C',
        1 : 'DP',
        2 : 'HDMI',
        3 : 'DVI',
        4 : 'D-SUB'
    },
    'pcie_version' : {
        0 : 'PCI',
        1 : 'PCIe',
        2 : 'PCIe3.0',
        3 : 'PCIe4.0',
        4 : 'PCIe5.0'
    },
    'io_header' : {
        0 : '썬더볼트4 헤더',
        1 : '썬더볼트3 헤더',
        2 : 'USB4 헤더',
        3 : 'USB3.1 헤더',
        4 : 'USB3.0 헤더',
        5 : 'USB2.0 헤더',
        6 : 'USB3.2 Type C 헤더',
        7 : 'USB3.1 Type C 헤더',
        8 : 'USB3.0 Type C 헤더',
        9 : '스템팬 6핀 헤더',
        10 : 'RGB 12V 4핀 헤더',
        11 : 'ARGB 5V 3핀 헤더',
        12 : 'ARGB 6핀 헤더',
        13 : 'TMP 헤더'
    },
    'feature' : {
        0 : '전원부 방열판',
        1 : 'DrMOS',
        2 : 'SPS(DrMOS)',
        3 : 'M.2 히트싱크',
        4 : 'LED 라이트',
        5 : '일체형IO실드',
        6 : 'UEFI',
        7 : '인텔 TBMT 3.0 지원',
        8 : 'AMD APU 지원'
    }
}

gpu_com = {
    'port' : {
        0 : 'HDMI2.1',
        1 : 'HDMI2.0',
        2 : 'HDMI',
        3 : 'DP2.1',
        4 : 'DP2.0',
        5 : 'DP1.4',
        6 : 'DP',
        7 : 'mini DP2.1',
        8 : 'mini DP1.4',
        9 : 'DVI(듀얼링크)',
        10 : 'DVI',
        11 : 'D-SUB',
        12 : 'USB Type-C',
        13 : '썬더볼트3',
        14 : 'USB 3.0',
        15 : 'TV-OUT'
    },
    'additional_function' : {
        0 : '제로팬(0-dB기술)',
        1 : '멀티 VGA',
        2 : '12K 지원',
        3 : '8K 지원',
        4 : '4K 지원',
        5 : 'HDR 지원',
        6 : 'Dual BIOS',
        7 : 'HDCP 2.3',
        8 : 'HDCP 지원'
    },
    'cooling_type' : {
        0 : '방열판',
        1 : '히트파이프',
        2 : '베이퍼챔버',
        3 : '팬쿨러',
        4 : '수냉 쿨링'
    },
    'feature' : {
        0 : '백플레이트',
        1 : 'DrMOS',
        2 : 'LED 라이트',
        3 : 'LCD 모니터링',
        4 : '오버클럭 물리키',
        5 : '수냉 장착 지원',
        6 : 'PWM 커넥터'
    }
}

ram_com = {
    'add_on' : {
        0 : 'LED 라이트',
        1 : 'XMP',
        2 : 'XMP3.0',
        3 : 'EXPO',
        4 : '온다이ECC',
        5 : 'ECC',
        6 : 'REG',
        7 : 'LP 사이즈',
        8 : '온도센서'
    },
    'led_system' : {
        0 : 'AURA SYNC',
        1 : 'MYSTIC LIGHT',
        2 : 'RGB FUSION',
        3 : 'POLYCHROME',
        4 : 'RGB SYNC',
        5 : 'CORSAIR iCUE',
        6 : 'RAZER CHROMA',
        7 : 'TT RGB PLUS',
        8 : 'G.SKILL Lighting',
        9 : 'T-FORCE BLITZ',
        10 : 'XPG RGB'
    }
}

case_com = {
    'board_support' : {
        0 : 'Extended-ATX',
        1 : '표준-ATX',
        2 : 'Micro-ATX',
        3 : 'Flex-ATX',
        4 : '표준-ITX',
        5 : 'Mini-ITX',
        6 : 'SSI-CEB',
        7 : 'SSI-EEB',
        8 : 'Mini-DTX',
    },
    'external_port' : {
        0 : 'USB',
        1 : 'USB 3.0',
        2 : 'USB 3.0 (Type-C)',
        3 : 'USB 3.1 (Type-C)',
        4 : 'USB 3.1 (Type-A)',
        5 : 'USB 3.2 (Type-C)',
        6 : 'eSATA',
        7 : 'HDMI',
        8 : '카드리더기',
    },
    'feature' : {
        0 : 'LED 라이트',
        1 : '방음패드 내장',
        2 : '상태표시 창',
        3 : 'HDD 도킹',
        4 : 'PC방 전용',
        5 : '수랭쿨링홀',
        6 : '채굴용(마이닝)',
        7 : '켄싱턴 락',
        8 : '상단 패널 탈착',
        9 : '그래픽카드 지지대'
    }
}

power_com = {
    'feature' : {
        0 : '팬리스모드',
        1 : '자동 팬 조절',
        2 : '수동 팬 조절',
        3 : '대기전력 1W 미만',
        4 : '프리볼트',
        5 : '플랫케이블',
        6 : 'LED 라이트',
        7 : '디지털제어'
    },
    'inside' : {
        0 : '85도 콘덴서',
        1 : '105도 콘덴서',
        2 : 'DC to DC 설계',
        3 : 'LLC공진형컨버터',
        4 : 'ACRF'
    },
    'protection' : {
        0 : '과전압(OVP)',
        1 : '저전압(UVP)',
        2 : '과전류(OCP)',
        3 : '과전력(OPP)',
        4 : '과열(OTP/OHP)',
        5 : '단락(SCP)',
        6 : '서지+인러쉬(SIP)',
        7 : '과부하(OLP)',
        8 : '무부하(NLP)',
        9 : '공회전(NLO)',
        10 : 'BOP'
    }
}

cooler_com = {
    'intel_socket' : {
        0 : 'LGA1700',
        1 : 'LGA1200',
        2 : 'LGA115x',
        3 : 'LGA4677',
        4 : 'LGA4189-4/5(소켓P4/P5)',
        5 : 'LGA2066',
        6 : 'LGA3647',
        7 : 'LGA2011-V3',
        8 : 'LGA2011',
        9 : 'LGA1366',
        10 : 'LGA775',
        11 : 'LGA771',
        12 : '소켓478',
        13 : '소켓370'
    },
    'amd_socket' : {
        0 : 'AM5',
        1 : 'AM4',
        2 : 'FMx/AMx(AM1/4외)',
        3 : 'AM1',
        4 : 'SP5',
        5 : 'TR4',
        6 : 'sWRX8',
        7 : 'sTRX4',
        8 : 'SP3',
        9 : '소켓939',
        10 : '소켓754',
        11 : '소켓940',
        12 : '소켓A',
        13 : '소켓F'
    },
    'feature' : {
        0 : 'LED 라이트',
        1 : 'PWM 지원',
        2 : 'RGB 컨트롤러',
        3 : '팬 컨트롤러',
        4 : '리모콘 지원',
        5 : '펌프속도조절',
        6 : '워터블록/로고 회전',
        7 : 'LCD',
        8 : '인디게이터',
        9 : '데이지체인',
        10 : '제로팬(0-dB기술)',
        11 : '수랭 커스텀',
        12 : '속도조절스위치',
        13 : '라디에이터 양면팬 지원',
        14 : '자석 고정형'
    }
}