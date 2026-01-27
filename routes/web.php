<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('products', function () {
        return Inertia::render('products');
    })->name('products');
    Route::get('articles', function () {
        return Inertia::render('articles');
    })->name('articles');
    Route::get('clients', function () {
        return Inertia::render('clients');
    })->name('clients');
    Route::get('gallery', function () {
        return Inertia::render('gallery');
    })->name('gallery');
    Route::get('events', function () {
        return Inertia::render('events');
    })->name('events');
});

require __DIR__.'/settings.php';
