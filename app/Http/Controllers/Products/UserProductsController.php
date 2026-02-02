<?php

namespace App\Http\Controllers\Products;

use App\Http\Controllers\Controller;
use App\Models\Products;
use Inertia\Inertia;

class UserProductsController extends Controller
{
    public function index()
    {
        $products = Products::orderBy('id', 'asc')->get()->map(function ($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'price' => $product->price,
                'image' => $product->image ? '/storage/' . $product->image : null,
            ];
        });

        return Inertia::render('comprof/products', [
            'products' => $products,
        ]);
    }

    public function show(Products $product)
    {
        // contoh sizes, bisa diubah sesuai kebutuhan / database nanti
        $sizes = [
            ['label' => 'S', 'price' => $product->price],
            ['label' => 'M', 'price' => $product->price + 10000],
            ['label' => 'L', 'price' => $product->price + 20000],
            ['label' => 'XL', 'price' => $product->price + 30000],
        ];

        return Inertia::render('comprof/payment', [
            'product' => [
                'id' => $product->id,
                'name' => $product->name,
                'image' => $product->image ? '/storage/' . $product->image : null,
                'sizes' => $sizes,
            ],
        ]);
    }
}
