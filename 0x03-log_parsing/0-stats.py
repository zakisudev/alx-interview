#!/usr/bin/python3
import sys
import signal

# Initialize counters
total_size = 0
status_codes = {str(code): 0
                for code in [200, 301, 400, 401, 403, 404, 405, 500]}
line_count = 0


def print_stats():
    print("File size: {}".format(total_size))
    for code in sorted(status_codes.keys()):
        if status_codes[code] > 0:
            print("{}: {}".format(code, status_codes[code]))


def signal_handler(sig, frame):
    print_stats()
    sys.exit(0)


# Register signal handler for CTRL+C
signal.signal(signal.SIGINT, signal_handler)

try:
    for line in sys.stdin:
        try:
            parts = line.split()
            size = int(parts[-1])
            code = parts[-2]

            if code in status_codes:
                status_codes[code] += 1

            total_size += size
            line_count += 1

            if line_count % 10 == 0:
                print_stats()

        except Exception:
            pass

except KeyboardInterrupt:
    pass

finally:
    print_stats()
