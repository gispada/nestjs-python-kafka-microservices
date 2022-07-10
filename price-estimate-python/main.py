from price_service import PriceService

def main():
    print('Starting Price service')
    service = PriceService()
    service.start()

if __name__ == '__main__':
    main()
