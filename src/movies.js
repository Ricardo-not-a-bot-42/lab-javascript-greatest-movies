// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors. How could you "clean" a bit this array and make it unified (without duplicates)?

let getAllDirectors = (array) => {
  let directorList = array.map((movie) => {
    return movie.director;
  });
  return directorList;
};

let directorsList = getAllDirectors(movies);

let cleanDirectorList = directorsList.filter((director, index) => {
  return directorsList.indexOf(director) === index;
});
// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?

let howManyMovies = (array) => {
  let howManyFilter = array.filter((movie) => {
    return (
      movie.director === 'Steven Spielberg' && movie.genre.includes('Drama')
    );
  });
  return howManyFilter.length;
};

// Iteration 3: All rates average - Get the average of all rates with 2 decimals

let ratesAverage = (array) => {
  let ratesAverageCount = array.reduce((acc, movie, index) => {
    if (typeof movie.rate !== 'number') {
      return acc + 0;
    }
    return acc + movie.rate;
  }, 0);
  let movieAmount = array.length ? array.length : 1;

  return Math.round((ratesAverageCount / movieAmount) * 100) / 100;
};

// Iteration 4: Drama movies - Get the average of Drama Movies

let dramaMoviesRate = (array) => {
  let getDramaMovies = array.filter((movie) => {
    return movie.genre.includes('Drama');
  });
  return ratesAverage(getDramaMovies);
};

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)

let orderByYear = (array) => {
  let orderedList = [...array];
  orderedList.sort((a, b) =>
    a.year - b.year === 0 ? a.title.localeCompare(b.title) : a.year - b.year
  );

  return orderedList;
};

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles

let orderAlphabetically = (array) => {
  let orderedList = [...array];
  orderedList.sort((a, b) => a.title.localeCompare(b.title));

  let alphabeticTop20 = orderedList
    .filter((movie, index) => {
      return index < 20;
    })
    .map((movie) => {
      return movie.title;
    });

  return alphabeticTop20;
};

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes

let turnHoursToMinutes = (array) => {
  let durationInMinutes = array.map((movie) => {
    let movieDuration = movie['duration'].split(' ');
    let duration = 0;
    if (movieDuration[0].includes('h')) {
      duration += parseInt(movieDuration[0]) * 60;
    } else {
      duration += parseInt(movieDuration[0]);
    }
    if (movieDuration[1]) {
      duration += parseInt(movieDuration[1]);
    }
    let updatedMovieTime = {
      ...movie,
      duration,
    };
    return updatedMovieTime;
  });
  return durationInMinutes;
};

// BONUS - Iteration 8: Best yearly rate average - Best yearly rate average

let bestYearAvg = (array) => {
  let allYears = [];
  let currentMaxAvgRate = 0;
  let currentBestYear = 0;

  if (!array.length) {
    return null;
  }

  for (let movie of array) {
    if (!allYears.includes(movie.year)) {
      allYears.push(movie.year);
    }
  }

  for (let year of allYears) {
    let yearFilteredMovies = array.filter((movie) => {
      return movie.year === year;
    });
    let yearAvgRate = ratesAverage(yearFilteredMovies);
    if (yearAvgRate > currentMaxAvgRate) {
      currentMaxAvgRate = yearAvgRate;
      currentBestYear = year;
    } else if (yearAvgRate === currentMaxAvgRate) {
      currentMaxAvgRate = yearAvgRate;
      currentBestYear = Math.min(year, currentBestYear);
    }
  }

  return `The best year was ${currentBestYear} with an average rate of ${currentMaxAvgRate}`;
};
