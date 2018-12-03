print "\t\t--!!Test code for the Gamooga!!--\n\n" 

# Solution for the first algo problem
import random
class RandomGen(object):
    # Values that may be returned by next_num()
    _random_nums =  [-1, 0, 1, 2, 3] 
    # Probability of the occurence of random_nums
    _probabilities =  [0.01, 0.3, 0.58, 0.1, 0.01]
    _prop_percents = [i * 100 for i in _probabilities]
    _prop_range = {}
    _outcome = {}
    total = 0
    for i,v in enumerate(_prop_percents):
        # print(i)
        total += v 
        _prop_range[i] = total

    def next_num(_prop_range, _random_nums):
        """
        Returns one of the randomNums. When this method is called
        multiple times over a long period, it should return the
        numbers roughly with the initialized probabilities.
        """
        temp = random.randint(1,100)

        for i in range(len(_prop_range)):
            # print(_prop_range.get(i))
            if(temp <= _prop_range.get(i)):
                return _random_nums[i]
        
        return 0


    if total != 100:
        print "Validation failed :as expected set of probabilities should add upto 100'%' or 1"
    if len(_random_nums) != len(_probabilities):
        print "Validation failed :as the expected number of randum nums and probabilitties not matching"    
    else:    
        # Running the next_num 100 times
        for i in range(100):
            val = next_num(_prop_range, _random_nums)
            if val in _outcome:
                _outcome.update({ val : _outcome.get(val)+1 })
            else:
                _outcome[val] = 1

        # final output:
        print "final output"
        for i in _random_nums:
            times = 0
            if i in _outcome:
                times = _outcome.get(i)
            print "\t",i, ":", times, "times"

"""
Solution for the SQL problem statements : 

SELECT p.product_id, p.name, SUM(o.quantity) AS overall_count 
FROM products p 
JOIN orders o on p.product_id = o.product_id
WHERE o.dispatch_date > last_year AND
      p.available_from < sys_date - month AND
      overall_count > 10
      GROUP_BY p.product_id
      
"""            