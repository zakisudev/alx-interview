#!/usr/bin/python3
""" Prime game """


def isWinner(x, nums):
    """ Finds the finner """
    def is_prime(num):
        if num < 2:
            return False
        for i in range(2, int(num**0.5) + 1):
            if num % i == 0:
                return False
        return True

    def get_primes_up_to_n(n):
        primes = []
        for i in range(1, n + 1):
            if is_prime(i):
                primes.append(i)
        return primes

    maria_wins = 0
    ben_wins = 0

    for n in nums:
        primes = get_primes_up_to_n(n)
        total_primes = len(primes)

        if total_primes % 2 == 0:
            ben_wins += 1
        else:
            maria_wins += 1

    if maria_wins > ben_wins:
        return "Maria"
    elif ben_wins > maria_wins:
        return "Ben"
    else:
        return None
