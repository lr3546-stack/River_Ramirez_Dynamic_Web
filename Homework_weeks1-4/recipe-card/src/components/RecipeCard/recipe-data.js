// Importing the image gives us back a url string that Vite knows how to
// serve in dev and how to fingerprint at build time.
import LAMB_RAGU from '../../assets/lamb-ragu.jpg'

export const RECIPE = {
  title: 'Slow Cooked Rosemary Lamb Ragu',
  imgSrc: LAMB_RAGU,
  imgAlt: 'Slow cooked rosemary lamb ragu with pappardelle',
  description:
    'Lamb shoulder slow cooked in a red wine and tomato sauce with rosemary until it falls apart, then shredded and tossed through pappardelle.',
  ingredients: [
    {measure: '1.25 kg', item: 'Boneless lamb shoulder'},
    {measure: '2 tbsp', item: 'Olive oil'},
    {measure: '1', item: 'Onion, finely chopped'},
    {measure: '2', item: 'Celery sticks, grated'},
    {measure: '1', item: 'Large carrot, grated'},
    {measure: '3', item: 'Garlic cloves, minced'},
    {measure: '1 tbsp', item: 'Rosemary, chopped, plus 5 sprigs'},
    {measure: '2', item: 'Bay leaves'},
    {measure: '1/4 cup', item: 'Tomato paste'},
    {measure: '1 1/2 cups', item: 'Red wine'},
    {measure: '400 g', item: 'Canned crushed tomato'},
    {measure: '1 1/2 cups', item: 'Chicken stock'},
    {measure: '2', item: 'Beef stock cubes, crumbled'},
    {measure: '500 g', item: 'Pappardelle'},
    {measure: 'To serve', item: 'Parmesan'},
  ],
  instructions: [
    'Season the lamb with salt and pepper and brown it in olive oil, then set it aside',
    'Cook the onion, celery, carrot, garlic and chopped rosemary slowly for 7 - 8 minutes',
    'Cook the tomato paste for 1 1/2 minutes, then add the wine and reduce by half',
    'Add the tomato, stock, stock cubes, bay leaves, 3 rosemary sprigs and the lamb',
    'Cover and simmer gently for 2 hours, until the lamb shreds easily',
    'Shred the lamb, return it to the pot and simmer uncovered for 30 minutes',
    'Cook the pasta 1 minute short of the packet time and save some pasta water',
    'Toss the pasta with the ragu and a splash of pasta water, then serve with parmesan',
  ],
}
